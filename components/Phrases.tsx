import { LayoutRectangle, ScrollView, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import { SpeakingContext } from '../hoc/SpeakingHoc';
import { LinearGradient } from 'expo-linear-gradient';
import Text from './Text';

export default function Phrases() {
    const scrollViewRef = useRef<ScrollView>(null);
    const { json, info } = useContext(SpeakingContext);
    const [active, setActive] = useState<LayoutRectangle>();

    useEffect(() => {
        if (active) {
            const height = scrollViewRef.current?.getScrollableNode().clientHeight;
            scrollViewRef.current?.scrollTo({ y: active.y + active.height / 2 - height / 2 });
        }
    }, [active]);

    if (!json || !info) {
        return null;
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgba(237, 237, 243, 0.8)', 'rgba(255, 255, 255, 0)']} style={[styles.shadow, styles.topShadow]} />
            <ScrollView ref={scrollViewRef} style={styles.phrases} bounces={false} scrollEnabled={!info.audio.playing}>
                <View key={info.phrases.active[0]} style={styles.groups}>
                    {json.phrases.map((group, i) => {
                        const isActiveGroup = i === info.phrases.active[0];

                        return (
                            <View
                                key={i}
                                style={[styles.group, isActiveGroup && styles.activeGroup]}
                                onLayout={isActiveGroup ? (event) => setActive(event.nativeEvent.layout) : undefined}
                            >
                                {group.map((phrase, j) => {
                                    const isLastPhrase = j === group.length - 1;
                                    const isActivePhrase = i === info.phrases.active[0] && j === info.phrases.active[1];

                                    return (
                                        <View key={phrase.start}>
                                            <View
                                                style={[
                                                    styles.phrase,
                                                    isActiveGroup && styles.activeGroupPhrase,
                                                    isLastPhrase && styles.lastPhrase,
                                                ]}
                                            >
                                                <View style={styles.label}>
                                                    <Text style={styles.labelText}>{phrase.name}</Text>
                                                </View>
                                                <Text style={[styles.phraseText, isActivePhrase && styles.highlight]}>{phrase.phrase}</Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(237, 237, 243, 0.8)']} style={[styles.shadow, styles.bottomShadow]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shadow: {
        position: 'absolute',
        width: '100%',
        height: 75,
        left: 0,
        zIndex: 1,
    },
    topShadow: {
        top: 0,
    },
    bottomShadow: {
        bottom: 0,
    },
    phrases: {
        paddingVertical: 75,
        paddingHorizontal: 24,
        flex: 1,
    },
    groups: {
        gap: 24,
    },
    group: {
        borderColor: '#F2EEF6',
        borderRadius: 10,
        borderWidth: 1,
    },
    activeGroup: {
        backgroundColor: '#ECEEFF',
        borderColor: '#E1E4FF',
    },
    phrase: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderColor: '#F2EEF6',
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    activeGroupPhrase: {
        borderColor: '#E1E4FF',
    },
    lastPhrase: {
        borderBottomWidth: 0,
    },
    phraseText: {
        fontSize: 14,
    },
    highlight: {
        fontWeight: 600,
        letterSpacing: -0.16,
        color: '#DBA604',
    },
    label: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderColor: '#E7E7E7',
        borderRadius: 18.5,
        borderWidth: 1,
    },
    labelText: {
        fontWeight: 800,
        fontSize: 12,
    },
});
