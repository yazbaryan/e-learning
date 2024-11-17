import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { FormattedSpeakingJson } from '../types';
import { formatSpeakersJson } from '../utils';

type SpeakingInitProps = {
    audio: string;
    json: string;
};

type SpeakingInfo = {
    loaded: boolean;
    audio: {
        duration: number;
        time: number;
        progress: number;
        playing: boolean;
    };
    phrases: {
        active: [number, number];
    };
};

type SpeakingContext = {
    init: (props: SpeakingInitProps) => Promise<void>;
    destroy: () => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    seek: (position: number) => Promise<void>;
    navigate: (way: -1 | 1) => Promise<void>;
    info?: SpeakingInfo;
    json?: FormattedSpeakingJson;
};

export const SpeakingContext = createContext<SpeakingContext>({
    init: () => Promise.resolve(),
    destroy: () => Promise.resolve(),
    play: () => Promise.resolve(),
    pause: () => Promise.resolve(),
    seek: () => Promise.resolve(),
    navigate: () => Promise.resolve(),
});

export default function SpeakingHoc({ children }: { children: React.ReactNode }) {
    const soundRef = useRef<Audio.Sound>();
    const jsonRef = useRef<FormattedSpeakingJson>();
    const infoRef = useRef<SpeakingInfo>();

    const [json, setJson] = useState<FormattedSpeakingJson>();
    const [info, setInfo] = useState<SpeakingInfo>();

    useEffect(() => {
        jsonRef.current = json;
    }, [json]);

    useEffect(() => {
        infoRef.current = info;
    }, [info]);

    const sync = async () => {
        if (!soundRef.current) return;

        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
            status.durationMillis = status.durationMillis || 1;

            let active: SpeakingInfo['phrases']['active'] = infoRef.current?.phrases.active || [-1, -1];
            for (const data of jsonRef.current?.timing || []) {
                const [start, end, group, phrase] = data;
                if (start <= status.positionMillis && end >= status.positionMillis) {
                    active = [group, phrase];
                    break;
                }
            }

            setInfo({
                loaded: true,
                audio: {
                    duration: status.durationMillis,
                    time: status.positionMillis,
                    progress: (status.positionMillis / status.durationMillis) * 100,
                    playing: status.isPlaying,
                },
                phrases: {
                    active,
                },
            });
        }

        requestAnimationFrame(() => sync());
    };

    const init = useCallback(async ({ audio, json }: SpeakingInitProps) => {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
        });

        await Promise.all([
            // Load audio
            Audio.Sound.createAsync({
                uri: audio,
            }).catch(() => Promise.reject(`Can't load audio`)),

            // Load phrases
            fetch(json)
                .then((data) => data.json())
                .then(formatSpeakersJson)
                .then(setJson)
                .catch(() => Promise.reject(`Can't load json`)),
        ]).then(([{ sound }]) => {
            return new Promise((resolve, reject) => {
                let init = false;
                sound.setOnPlaybackStatusUpdate(async (status) => {
                    if (!init && status.isLoaded) {
                        await sound.setPositionAsync(1).catch(() => {});
                        if (status.durationMillis) {
                            init = true;
                            await sound.setPositionAsync(0).catch(() => {});
                            await sync();
                            resolve(true);
                        }
                    } else if (!status.isLoaded && status.error) {
                        reject(`Can't load audio`);
                    }
                });
                soundRef.current = sound;
            });
        });
    }, []);

    const destroy = useCallback(async () => {
        if (!soundRef.current) {
            return;
        }

        await soundRef.current.unloadAsync();
        soundRef.current = undefined;

        setJson(undefined);
        setInfo(undefined);
    }, [soundRef.current]);

    const play = useCallback(async () => {
        if (!soundRef.current) {
            return Promise.reject('No audio for playing');
        }

        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.positionMillis === status.durationMillis) {
            await soundRef.current.setPositionAsync(0);
        }
        await soundRef.current.playAsync();
    }, [soundRef.current]);

    const pause = useCallback(async () => {
        if (!soundRef.current) {
            return Promise.reject('No audio for pause');
        }

        await soundRef.current.pauseAsync();
    }, [soundRef.current]);

    const seek = useCallback(
        async (position: number) => {
            if (!soundRef.current) {
                return Promise.reject('No audio for seek');
            }

            await soundRef.current.setPositionAsync(position).catch(() => {});
        },
        [soundRef.current]
    );

    const navigate = useCallback(
        async (way: -1 | 1) => {
            if (!soundRef.current) {
                return Promise.reject('No audio for navigate');
            }

            if (!json) {
                return Promise.reject('No data for navigate');
            }

            const status = await soundRef.current.getStatusAsync();
            if (!status.isLoaded) {
                return Promise.reject('Audio not loaded');
            }

            const keys = json.timing.map(([start]) => start);
            const index = Math.max(
                0,
                Math.min(keys.length - 1, keys.findIndex((key) => key <= status.positionMillis) + (way === -1 ? 1 : -1))
            );
            await seek(keys[index]);
        },
        [soundRef.current, json]
    );

    return (
        <SpeakingContext.Provider value={{ init, destroy, play, pause, seek, navigate, json, info }}>{children}</SpeakingContext.Provider>
    );
}
