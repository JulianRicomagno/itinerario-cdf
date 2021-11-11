import React , {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";

export function RegisterForm({route, navigation}) {
  const [email , setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [userName , setUserName] = useState('');
  // <InputI placeHolder="Confirm Password" isSecure={true} /> (Cuando valide lo agrego)

  return (
    <View style={styles.formContainer}>
      <InputI placeHolder="Nombre de Usuario" onChange={setUserName} />
      <InputI placeHolder="Correo electrónico" onChange={setEmail} />
      <InputI placeHolder="Contraseña" isSecure={true} onChange={setPasswd}/>
      <GreenButton
        onPress={() => navigation.navigate("generalinfo" , { user: {userName: userName , passwd: passwd, email: email}})}
        text="Continuar"
      />
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
