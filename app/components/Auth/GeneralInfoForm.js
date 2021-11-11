import React , {useState} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
import { handleUser } from "../../utils/Context/Storage";
import { Input } from "react-native-elements/dist/input/Input";
import { ItemDropdown } from "../ItemDropdown";

export function GeneralInfoForm({route , navigation}) {
  const {userName, email, passwd} = route.params.user;
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [nationality, setNationality] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  function register(){
    setTimeout(() => {
      const user = {userName : userName, email: email, passwd: passwd, name: name, lastName: lastName, age: age, gender: gender, nationality: nationality, country: country, city: city,}
      handleUser('register' , () => {} , user);
      navigation.navigate('login');
    }, 400)
  }
  //<ItemDropdown data={[{ label: 'Masculino' ,value :'Masculino'} ,{label: 'Femenino' , value: 'Femenino'}  , {label: 'Otro', value: 'Otro'}]} title={'Genero'} hook={setGender}/>

  return (
    <View style={styles.formContainer}>
      <InputI placeHolder="Nombre" onChange={setName} />
      <InputI placeHolder="Apellido" onChange={setLastName} />
      <Input style={{
                    ...styles.input,
                    textAlign: 'center',
                    marginLeft: 10,
                }}
                placeholder={"Edad"}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={setAge}
                keyboardType = 'numeric'
        />
      <InputI placeHolder="Genero" onChange={setGender}/>
      <InputI placeHolder="Nacionalidad" onChange={setNationality}/>
      <InputI placeHolder="Pais de Residencia" onChange={setCountry}/>
      <InputI placeHolder="Ciuda de Residencia" onChange={setCity}/>
      <GreenButton onPress={register} text="Registrarse" />
    </View>
  );

  // todo
  function validateNumeric(e){

    setAge(e.replace(/[^0-9]/g, ''))
  }
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
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
});
