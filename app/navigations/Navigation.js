import React , {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import AccountStack from './AccountStack';
import AttractionsStack from './AttractionsStack';
import LoggedAccountStack from './LoggedAccountStack';
import ItineraryStack from './ItineraryStack';
import { Image } from 'react-native';
import {useAuthContext, useAuthUpdateContext} from '../utils/Context/AuthContext' 
import { handleUser } from '../utils/Context/Storage';
import logo from '../../assets/logoPosadas.png';

const Tab = createBottomTabNavigator();
export default function Navigation() {
    const updateUser = useAuthUpdateContext();
    const user = useAuthContext();
    const [isLoading , setIsLoading] = useState(true);

    if(user.token != undefined && user.token !== ''){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='itinerary'
                screenOptions={({ route }) => ({
                    tabBarInactiveTintColor: '#385F5E',
                    tabBarActiveTintColor: '#32BB77',
                    headerShown: false,
                    tabBarIcon: ({ color }) => screenOptions(route, color), 
                })}
            >
                
                <Tab.Screen
                    name='explore'
                    component={AttractionsStack}
                    options={{ title: 'Atracciones' }} />
                <Tab.Screen
                    name='itinerary'
                    component={ItineraryStack}
                    options={{ title: 'Itinerario' }}/>
                <Tab.Screen
                    name='account'
                    component={LoggedAccountStack}
                    options={{ title: 'Mi Cuenta' }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
    }
    return(
        <NavigationContainer>
            <AccountStack/>
        </NavigationContainer>
    );
    
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "explore":
            iconName = 'map-search'
            break;
        case "itinerary":
            iconName = 'calendar-clock'
            break;
        case "account":
            iconName = 'account'
            break;        
    }
    return (
        <Icon type='material-community' name={iconName} size={35} color={color} />
    )
}

