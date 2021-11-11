import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyData from "../screens/Auth/MyData";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="datos"
        component={MyData}
        options={{ title: "Usuario" }}
      />
    </Stack.Navigator>
  );
}