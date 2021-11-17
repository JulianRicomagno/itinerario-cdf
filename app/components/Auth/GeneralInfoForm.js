import React , {useState} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
import { handleUser } from "../../utils/Context/Storage";
import { Input } from 'react-native-elements';
import { ItemDropdown } from "../ItemDropdown";
import * as Yup from 'yup';
import { Formik } from 'formik';
import RNPickerSelect from "react-native-picker-select";

const mensajeYup = 'El campo es obligatorio';

const generalInfoSchema = Yup.object().shape({
  name: Yup
  .string()
  .min(5,'Su nombre debe tener un minimo de 5 caracteres')
  .required(mensajeYup),
  surname: Yup
  .string()
  .min(5,'Su apellido debe tener un minimo de 5 caracteres')
  .required(mensajeYup),
  age: Yup
  .number("Solo se pueden ingresar numeros")
  .min(18, "Debes tener al menos 18 años")
  .max(99,"Debes tener menos de 100 años")
  .required(mensajeYup),

  genre: Yup
  .string(mensajeYup)
  .required(mensajeYup),

  countryOrigin: Yup
  .string(mensajeYup)
  .required(mensajeYup),

  countryResidence: Yup
  .string(mensajeYup)
  .required(mensajeYup),

  cityResidence: Yup
  .string(mensajeYup)
  .required(mensajeYup),
});

export function GeneralInfoForm({route , navigation}) {
  const {userName, email, passwd} = route.params.user;
  const [gender, setGender] = useState('Genero');
  const [nationality, setNationality] = useState('Pais de Origen');
  const [country, setCountry] = useState('Pais de Residencia');
  const [city, setCity] = useState('Ciudad de Residencia');

  function register(data){
    const user = {
      userName : userName, 
      email: email, 
      passwd: passwd, 
      name: data.name, 
      lastName: data.surname, 
      age: data.age, 
      gender: data.genre, 
      nationality: data.countryOrigin, 
      country: data.countryResidence, 
      city: data.cityResidence,}
    handleUser('register' , () => {} , user);
    navigation.navigate('login');
  }

  const generoPlaceHolder = {
    label: 'Genero',
    value: null,
    color: 'grey',
  };

  const nationalityPlaceHolder = {
    label: 'Pais de Origen',
    value: null,
    color: 'grey',
  };

  const countryPlaceHolder = {
    label: 'Pais de Residencia',
    value: null,
    color: 'grey',
  };

  const cityPlaceHolder = {
    label: 'Ciudad de Residencia',
    value: null,
    color: 'grey',
  };

  const generos = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
  ]

  return (

    <Formik
    initialValues={{
      name: '' ,
      surname: '',
      age: '',
      genre: '',
      countryOrigin: '',
      countryResidence: '',
      cityResidence: '',
    }}
    validationSchema={generalInfoSchema}
    onSubmit={
      (values)=> {
        register(values);
      }
    }
    >
    
    {({ errors,  handleChange, handleSubmit, setFieldValue, values }) => (
    <View style={styles.formContainer}>
      <InputI
      placeHolder={"Nombre"} 
      isSecure={false}
      value={values.name} 
      onChangeText={handleChange('name')}
      errorMessage={errors.name}
      id={"name"} 
      />
      <InputI 
      placeHolder={"Apellido"} 
      isSecure={false}
      value={values.surname} 
      onChangeText={handleChange('surname')}
      errorMessage={errors.surname}
      id={"surname"}  
      />
      <Input style={{
                    ...styles.input,
                    textAlign: 'center',
                    marginLeft: 10,
                }}
                placeholder={"Edad"}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                keyboardType = 'numeric'
                value={values.age} 
                onChangeText={handleChange('age')}
                errorMessage={errors.age}
                id={"age"}
      />
      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={generoPlaceHolder}
          items={generos}
          onValueChange={(value) => { 
            setGender(value);
            setFieldValue('genre',value);
          }}
          value={values.genre}
        >
          <Text style={styles.buttonText}>{gender}</Text>
        </RNPickerSelect>
      </View>
      <Text style={styles.errorText}>{errors.genre}</Text>

      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={nationalityPlaceHolder}
          items={[
            { label: "Argentina", value: "Argentina" },
            { label: "Brasil", value: "Brasil" },
          ]}
          onValueChange={(value) => { 
            setNationality(value);
            setFieldValue('countryOrigin',value);
          }}
          value={values.countryOrigin}
        >
          <Text style={styles.buttonText}>{nationality}</Text>
        </RNPickerSelect>
      </View>
      <Text style={styles.errorText}>{errors.countryOrigin}</Text>

      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={countryPlaceHolder}
          items={[
            { label: "Argentina", value: "Argentina" },
            { label: "Brasil", value: "Brasil" },
          ]}
          onValueChange={(value) => { 
            setCountry(value);
            setFieldValue('countryResidence',value);
          }}
          value={values.countryResidence}
        >
          <Text style={styles.buttonText}>{country}</Text>
        </RNPickerSelect>
      </View>
      <Text style={styles.errorText}>{errors.countryResidence}</Text>

      <View style={styles.picker}>
        <RNPickerSelect
          placeholder={cityPlaceHolder}
          items={[
            { label: "Buenos Aires", value: "Buenos Aires" },
            { label: "Cordoba", value: "Cordoba" },
          ]}
          onValueChange={(value) => { 
            setCity(value);
            setFieldValue('cityResidence',value);
          }}
          value={values.cityResidence}
        >
          <Text style={styles.buttonText}>{city}</Text>
        </RNPickerSelect>
      </View>
      <Text style={styles.errorText}>{errors.cityResidence}</Text>

      <GreenButton onPress={handleSubmit} text="Registrarse" />
    </View>
    )}
    </Formik>
  );
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
  picker: {
    paddingVertical: 10,
    marginVertical: 1,
    width: '91%',
    height: 50,
    borderRadius: 32,
    borderColor: '#32BB77',
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginLeft: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  errorText:{
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 1,
  }
});
