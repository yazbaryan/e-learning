import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/src/types';
import { SpeakingContext } from '../hoc/SpeakingHoc';
import Head from '../components/Head';
import Phrases from '../components/Phrases';
import Controls from '../components/Controls';
import { NavigationParamList, SpeakingItem } from '../types';
import { toast } from '../utils';

type Props = {
    item: SpeakingItem;
};

export default function Speaking({ item }: Props) {
    const navigation = useNavigation<NavigationProp<NavigationParamList>>();

    const { init, destroy } = useContext(SpeakingContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        init({
            audio: item.audio,
            json: item.json,
        })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                navigation.navigate('Select', {});
                toast(error);
            });

        return () => {
            destroy();
        };
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    <Head />
                    <Phrases />
                    <Controls />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});
