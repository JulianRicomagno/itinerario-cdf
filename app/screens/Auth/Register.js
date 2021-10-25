import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet, Image , ScrollView, View, Text, KeyboardAvoidingView} from 'react-native';
import logo from '../../../assets/logoPosadas.png';
import { RegisterForm } from '../../components/Auth/RegisterForm';

export default function Register(props) {
    const { changeForm } = props;
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={logo}
            />
            <Text style={styles.textTitles}> Sign Up </Text>             
            <RegisterForm />
            <Text onPress={changeForm}> Log in </Text>

        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignSelf: 'center',
    },
    logo: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    textTitles: {
        alignSelf: 'center',
        fontSize: 48,
        color: '#0B3534',
    }    
});