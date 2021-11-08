import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AccountStack from "./AccountStack";
import AttractionsStack from "./AttractionsStack";
import ItineraryStack from "./ItineraryStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="itinerary"
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "#385F5E",
          tabBarActiveTintColor: "#32BB77",
          headerShown: false,
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="explore"
          component={AttractionsStack}
          options={{ title: "Atracciones" }}
        />
        <Tab.Screen
          name="itinerary"
          component={ItineraryStack}
          options={{ title: "Itinerario" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Mi Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "explore":
      iconName = "map-search";
      break;
    case "itinerary":
      iconName = "calendar-clock";
      break;
    case "account":
      iconName = "account";
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={35} color={color} />
  );
}
