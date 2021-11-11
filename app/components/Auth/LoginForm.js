import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton, WhiteButton } from "../../components/buttonI";
import { handleUser } from "../../utils/Context/Storage";
import { useAuthUpdateContext } from '../../utils/Context/AuthContext';

export function LoginForm(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const updateUser = useAuthUpdateContext();

  useEffect(() => {
    handleUser('update' , updateUser);
}, [])

function login(){
    setTimeout(() => {
       handleUser('login' , updateUser , {email: email, passwd: passwd}); 
    }, 800)
  };

  return (
    <View style={styles.formContainer}>
      <InputI placeHolder="Email" onChange={setEmail} defaultValue={email} />
      <InputI placeHolder="Password" onChange={setPasswd} defaultValue={passwd} isSecure={true} />  
      <ForgotPassword style={styles.forgotPassword} />
      <GreenButton onPress={login} text="Login" />

      <WhiteButton
        onPress={() => navigation.navigate("register")}
        text="Registro"
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
