import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Attractions from '../screens/Attractions';
import SearchAtraccion from '../screens/Attractions/SearchAtraccion';

const Stack = createStackNavigator();
export default function AttractionsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="attractions"
                component={SearchAtraccion}
                options={{ title: 'Atracciones' }}
            />
        </Stack.Navigator>
    )
}