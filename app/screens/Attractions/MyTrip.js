import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

export default function MyTrip({ route, navigation }) {
  const { item } = route.params;

  if (item != null) {
    return (
      <View>
        <Text>
          Aca se ve el detalle de la atracción por el usuario y tiene el boton
          add
        </Text>
        <Text>{item.name}</Text>
        <Text>{item.status}</Text>
        <Avatar source={{ uri: item.image }} />
      </View>
    );
  } else {
    return (
      <View>
        <Text>NO hay viaje</Text>
      </View>
    );
  }
}
