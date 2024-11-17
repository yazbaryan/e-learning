import {
    GestureResponderEvent,
    LayoutRectangle,
    NativePointerEvent,
    NativeSyntheticEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useContext, useState } from 'react';
import moment from 'moment';
import { SpeakingContext } from '../hoc/SpeakingHoc';
import BackwardIcon from '../assets/icons/Backward';
import ForwardIcon from '../assets/icons/Forward';
import PlayIcon from '../assets/icons/Play';
import PauseIcon from '../assets/icons/Pause';
import Text from './Text';

export default function Controls() {
    const { play, pause, seek, navigate, info } = useContext(SpeakingContext);

    const [layout, setLayout] = useState<LayoutRectangle>();
    const [playing, setPlaying] = useState<boolean>();
    const [seeking, setSeeking] = useState<boolean>(false);

    if (!info?.loaded) {
        return null;
    }

    const time = moment.utc(info.audio.time).format('mm:ss');
    const duration = moment.utc(info.audio.duration).format('mm:ss');

    const handleSeeking = async (event: NativeSyntheticEvent<NativePointerEvent> | GestureResponderEvent) => {
        if (!seeking || !layout) return;

        if (playing === undefined) {
            setPlaying(info.audio.playing);
            pause();
        }

        let x = 0;
        if ('changedTouches' in event.nativeEvent) {
            x = event.nativeEvent.changedTouches[0].pageX - layout.x;
        } else {
            x = event.nativeEvent.pageX;
        }
        const p = Math.max(0, Math.min(x / layout.width));

        seek(info.audio.duration * p);
    };

    const handleSeekEnd = async () => {
        if (playing) {
            await play();
        }
        setSeeking(false);
        setPlaying(undefined);
    };

    return (
        <View style={styles.container}>
            <View
                onLayout={(event) => setLayout(event.nativeEvent.layout)}
                onPointerDown={() => setSeeking(true)}
                onPointerUp={handleSeekEnd}
                onPointerMove={handleSeeking}
                onTouchStart={() => setSeeking(true)}
                onTouchEnd={handleSeekEnd}
                onTouchMove={handleSeeking}
            >
                <View style={styles.track}>
                    <View style={[styles.progress, { width: `${info.audio.progress}%` }]}></View>
                </View>
                <View style={styles.timing}>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.time}>{duration}</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={() => navigate(-1)}>
                    <BackwardIcon />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.highlighted]} onPress={info.audio.playing ? pause : play}>
                    {info.audio.playing ? <PauseIcon color={'#DBA604'} /> : <PlayIcon color={'#DBA604'} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigate(1)}>
                    <ForwardIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
    },
    track: {
        width: '100%',
        backgroundColor: '#8794FF33',
    },
    progress: {
        height: 10,
        backgroundColor: '#DBA604',
    },
    timing: {
        paddingTop: 10,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    time: {
        fontSize: 10,
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlighted: {
        backgroundColor: '#8794FF33',
    },
});
