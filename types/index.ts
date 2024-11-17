export type Time = number;

export type SpeakingJson = {
    pause: number;
    speakers: {
        name: string;
        phrases: {
            time: number;
            words: string;
        }[];
    }[];
};

export type FormattedSpeakingJson = {
    phrases: {
        name: string;
        phrase: string;
        start: number;
        end: number;
    }[][];
    timing: [Time, Time, number, number][]; // [start time, end time, group index, phrase index]
};

export type SpeakingItem = {
    name: string;
    audio: string;
    json: string;
};

export type NavigationParamList = {
    Select: {};
    Speaking: SpeakingItem;
};

export type IconProps = {
    color?: string;
};
