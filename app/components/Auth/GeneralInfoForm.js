import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";

export function GeneralInfoForm() {
  return (
    <View style={styles.formContainer}>
      <InputI placeHolder="Nombre" />
      <InputI placeHolder="Apellido" />
      <InputI placeHolder="Edad" />
      <InputI placeHolder="Genero" />
      <InputI placeHolder="Nacionalidad" />
      <InputI placeHolder="Pais de Residencia" />
      <InputI placeHolder="Ciuda de Residencia" />
      <GreenButton onPress={() => alert("Click!")} text="Next" />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
