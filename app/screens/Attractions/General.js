import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function General(props) {
    const { navigation, route}= props
    return (
        <View>
            <Text>Home</Text>
            <View style={styles.bottom}>
            <Button
                title="Crear Itinerario"
                onPress={() =>
                    navigation.navigate("createItineraty")}
            />
            <Button
                title="My Trip"
                onPress={() =>
                    navigation.navigate("myTrip")}
            />
            <Button
                title="Search Atraccion"
                onPress={() =>
                    navigation.navigate("searchAtraccion")}
            />
            <Button
                title="Detalle Atracciones"
                onPress={() =>
                    navigation.navigate("detalleAtraccion")}
            />
            
            </View>
        </View>
    )
}

const styles =  StyleSheet.create ({
    viewBody : {
      flex : 1 ,
      backgroundColor : "#fff" ,
    },
    bottom:{
        margin: 50,
    }
})
