import React from 'react';
import { createStackNavigator } from '@react-navigation/stack-navigator';
import Account from '../screens/Auth/Account';

const Stack = createStackNavigator();
export default function AttractionsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="attractions"
                component={Account}
                options={{ title: 'Mi cuenta' }}
            />
        </Stack.Navigator>
    )
}