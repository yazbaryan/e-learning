import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import { FormattedSpeakingJson, SpeakingJson } from '../types';

export const formatSpeakersJson = (json: SpeakingJson): FormattedSpeakingJson => {
    const formatted: FormattedSpeakingJson = {
        phrases: [],
        timing: [],
    };
    const phrasesLength = json.speakers[0].phrases.length;

    let time = 0;
    for (let i = 0; i < phrasesLength; i++) {
        const temp = formatted.phrases.push([]) - 1;
        for (let j = 0; j < json.speakers.length; j++) {
            const phrase = {
                name: json.speakers[j].name,
                phrase: json.speakers[j].phrases[i].words,
                start: time,
                end: time + json.speakers[j].phrases[i].time,
            };
            formatted.phrases[temp].push(phrase);
            formatted.timing.unshift([phrase.start, phrase.end, i, j]);

            time = phrase.end + json.pause;
        }
    }

    return formatted;
};

let prevToast: any;
export const toast = (message: string) => {
    if (Platform.OS === 'web') {
        alert(message);
    } else {
        prevToast && Toast.hide(prevToast);
        prevToast = Toast.show(message);
    }
};
