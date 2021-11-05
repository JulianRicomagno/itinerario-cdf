import React from 'react'
import { Text } from 'react-native-elements'
//import {  } from 'react-native-gesture-handler'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function ButtonAdd({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#385F5E',
        width: 50,
        height: 50,
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: '#FFFFFF',
        borderWidth: 3,
        marginBottom: 16,
        marginLeft: 25,

    },
    text: {
        flex: 1,
        fontSize: 25,
        color: '#FFFFFF',
        alignSelf: 'center',
    }
})