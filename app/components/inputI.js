import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';

export function InputI(props) {
    const { placeHolder, isSecure , onChange , defaultValue } = props;
    return (
        <View>
            <Input
                style={{
                    ...styles.input,
                    textAlign: 'center',
                    marginLeft: 10,
                }}
                placeholder={placeHolder}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                secureTextEntry={isSecure}
                defaultValue={defaultValue}
                onChangeText={onChange}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        paddingVertical: 10,
        marginVertical: 1,
        width: '75%',
        borderRadius: 32,
        borderColor: '#32BB77',
        borderWidth: 1,
        fontSize: 18,
        backgroundColor: '#FFFFFF'
    },
})
