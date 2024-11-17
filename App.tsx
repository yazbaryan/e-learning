import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts, Outfit_400Regular, Outfit_600SemiBold, Outfit_800ExtraBold } from '@expo-google-fonts/outfit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationParamList } from './types';
import SpeakingScreen from './screens/Speaking';
import SelectScreen from './screens/Select';

const Stack = createNativeStackNavigator<NavigationParamList>();

export default function App() {
    const [fontsLoaded] = useFonts({
        Outfit_400Regular,
        Outfit_600SemiBold,
        Outfit_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <RootSiblingParent>
            <StatusBar style="auto" />
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'white',
                            },
                        }}
                    >
                        <Stack.Screen name="Select" component={SelectScreen} />
                        <Stack.Screen name="Speaking" component={SpeakingScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </RootSiblingParent>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1',
        flex: 1,
    },
    inner: {
        flex: 1,
    },
});
