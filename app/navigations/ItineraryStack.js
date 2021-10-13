import React from 'react';
import { createStackNavigator } from '@react-navigation/stack-navigator';
import Itinerary from '../screens/Itinerary';

const Stack = createStackNavigator();
export default function ItineraryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="attractions"
                component={Itinerary}
                options={{ title: 'Itinerario' }}
            />
        </Stack.Navigator>
    )
}