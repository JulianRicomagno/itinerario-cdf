import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
} from "react-native";
import logo from "../../../assets/logoPosadas.png";
import { GeneralInfoForm } from "../../components/Auth/GeneralInfoForm";

export default function GeneralInfo(props) {
  const { navigation , route } = props;
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.textTitles}> Información General </Text>
        <GeneralInfoForm navigation={navigation} route={route}/>
        {/* <Text onPress={() => navigation.navigate("login")}> Inicio </Text> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textTitles: {
    textAlign: "center",
    fontSize: 48,
    color: "#0B3534",
  },
});
