import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { darkTheme } from './themes';
import HomeScreen from './screens/HomeScreen';
import ConfigScreen from './screens/ConfigScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider theme={darkTheme}>
            <NavigationContainer theme={darkTheme}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Liste des Programmes' }}
                    />
                    <Stack.Screen
                        name="Config"
                        component={ConfigScreen}
                        options={{ title: 'Créer / Modifier un Programme' }}
                    />
                    <Stack.Screen
                        name="Timer"
                        component={TimerScreen}
                        options={{ title: 'Minuterie' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
