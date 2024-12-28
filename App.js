import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper'; // Import React Native Paper

import ConfigScreen from './screens/ConfigScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Config">
                    <Stack.Screen name="Config" component={ConfigScreen} options={{ title: 'Configurer le Timer' }} />
                    <Stack.Screen name="Timer" component={TimerScreen} options={{ title: 'Timer Actif' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
