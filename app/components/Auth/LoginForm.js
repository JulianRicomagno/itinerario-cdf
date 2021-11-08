import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton, WhiteButton } from "../../components/buttonI";

export function LoginForm(props) {
  const { navigation } = props;
  return (
    <View style={styles.formContainer}>
      <InputI placeHolder="Username" />
      <InputI placeHolder="Password" />
      <ForgotPassword style={styles.forgotPassword} />
      <GreenButton onPress={() => alert("Click!")} text="Login" />

      <WhiteButton
        onPress={() => navigation.navigate("register")}
        text="Sign Up"
      />
    </View>
  );
}

// Boton que va a llevar a la funcion olvido su pass, falta funcionamiento.
function ForgotPassword() {
  return (
    <Text
      style={styles.forgotPassword}
      onPress={() => alert("Olvide mi password!")}
    >
      {" "}
      Forgot password?
    </Text>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    fontStyle: "italic",
  },
});
