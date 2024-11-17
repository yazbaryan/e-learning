import { StyleSheet, View } from 'react-native';
import EnIcon from '../assets/icons/locales/En';
import EsIcon from '../assets/icons/locales/Es';

export default function Head() {
    return (
        <View style={styles.container}>
            <View style={styles.locales}>
                <EnIcon />
                <EsIcon />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F6F6F9',
        borderBottomWidth: 1,
    },
    locales: {
        padding: 2,
        flexDirection: 'row',
        borderColor: '#E1E4FF',
        borderRadius: 18.5,
        borderWidth: 1,
        gap: 26,
    },
});
