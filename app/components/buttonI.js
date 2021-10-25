import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function GreenButton(props) {
    const { onPress, text } = props;
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: '#32BB77'
            }}
            onPress={onPress}
        >
            <Text
            style={{
                ...styles.buttonText,
                color: '#f1f1f1'
            }}
            >{ text }</Text>
        </TouchableOpacity>
    )
}

export function WhiteButton(props) {
    const { onPress, text } = props;
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: '#FFFFFF'
            }}
            onPress={onPress}
        >
            <Text
            style={{
                ...styles.buttonText,
                color: '#32BB77'
            }}
            >{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        paddingVertical: 10,
        marginVertical: 10,
        width: '75%',
        borderRadius: 32,
        borderColor: '#32BB77',
        borderWidth: 1,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18
    }
})
