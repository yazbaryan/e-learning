import { useNavigation } from '@react-navigation/native';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { NavigationParamList, SpeakingItem } from '../types';
import type { NavigationProp } from '@react-navigation/core/src/types';

const list: SpeakingItem[] = [
    {
        name: 'Working example',
        audio: 'https://autocity.am/example_audio.mp3',
        json: 'https://autocity.am/example_audio.json',
    },
    {
        name: 'Incorrect audio',
        audio: 'https://autocity.am/example_audio.json',
        json: 'https://autocity.am/example_audio.json',
    },
    {
        name: 'Incorrect json',
        audio: 'https://autocity.am/example_audio.mp3',
        json: 'https://autocity.am/example_audio.mp3',
    },
];

export default function SelectScreen() {
    const navigation = useNavigation<NavigationProp<NavigationParamList>>();

    const select = (item: SpeakingItem) => {
        navigation.navigate('Speaking', item);
    };

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {list.map((item) => (
                    <Button key={item.name} title={item.name} onPress={() => select(item)} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        gap: 24,
    },
});
