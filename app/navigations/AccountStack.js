import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Auth/Account';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

const Stack = createStackNavigator();
export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: 'Iniciar Sesion' }}            
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: 'Registro' }}            
            />            
        </Stack.Navigator>
    )
}