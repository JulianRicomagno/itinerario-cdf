import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Attractions from '../screens/Attractions';

const Stack = createStackNavigator();
export default function AttractionsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="attractions"
                component={Attractions}
                options={{ title: 'Atracciones' }}
            />
        </Stack.Navigator>
    )
}