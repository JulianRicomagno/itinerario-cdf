import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Login from './Login';
import Register from './Register';
import { layoutStyle } from '../../styles';
import logo from '../../../assets/logoPosadas.png';

export default function Account() {
    const [showLogin, setShowLogin] = useState(false);

    const changeForm = () => setShowLogin(!showLogin);
    return (
        <View style={layoutStyle.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {showLogin ? <Login changeForm={changeForm}/> : <Register changeForm={changeForm}/>}
            </KeyboardAvoidingView>
        </View>
    );
}

