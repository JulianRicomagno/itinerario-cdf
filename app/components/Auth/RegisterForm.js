import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { InputI } from '../../components/inputI';
import { GreenButton } from '../../components/buttonI';

export function RegisterForm() {
    return (
        <View style={styles.formContainer}>
            <InputI placeHolder ='Username'/>                 
            <InputI placeHolder ='Email' />
            <InputI placeHolder ='Password' isSecure={true}/>                 
            <InputI placeHolder ='Confirm Password' isSecure={true}/> 
            <GreenButton onPress={() => alert('Click!')} text='Next' />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
    }
});