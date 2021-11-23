import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, Button } from "react-native";
import { InputI } from "../../components/inputI";
import { GreenButton } from "../../components/buttonI";
//todo Update with Update endpoint
import { forgotPassword, updatePassword } from "../../api/PosadasApi";

import * as Yup from 'yup';
import { Formik } from 'formik';

const passSchema = Yup.object().shape({
    passwd: Yup
      .string('Ingrese su nueva pass')
      .min(6,'La pass debe contener minimo 6 caracteres')
      .required('La contraseña es requerida'),
  })
  
  
  
const ModalPopUp = ({visible, children}) =>{
  const [showModal, setShowModal] = useState(visible)

    
  
    useEffect(() => {
        toggleModal();
    },[visible])
  
    const toggleModal = () => {
        if(visible){
          setShowModal(true);
        }else {
          setShowModal(false);
        }
    };
  
    return <Modal transparent visible ={showModal}>
    
      <View style={styles.modalBackground} >
        <View style={[styles.modalContainer]}>
          {children}
        </View>
      </View>
    </Modal>
 

  };

  export function EditPassModal(props){
    const {open, setVisible = useState()} = props
    const [disabled , setDisabled] = useState(false);
    const [forgotEmail , setForgotEmail] = useState();

    /*
    function checkCompleted(){
      setDisabled(!validateEmail()) 
       
    }*/

/*
    useEffect(() => {
      checkCompleted();
  }, [forgotEmail])
*/
/*
  function validateEmail() {

    var re = /\S+@\S+.\S+/;
    return re.test(forgotEmail);
     
  }*/


  //* Function to trigger endpoint
  function newPass(password){
    
  updatePassword(password)
  .then((response) => {
    setVisible()
  }).catch((error) => {
    console.log(error.message)
  })
    alert("La password se actualizo correctamente")
  }

          

    return(
    
        <Formik
        initialValues={{
          passwd: '',
        }}
        validationSchema={passSchema}
        onSubmit={
          (values)=> {
            newPass(values.passwd)
            console.log('Pass:' + values.passwd)
          }
        }
        >    
        {({ errors, handleChange, handleSubmit, values }) => (

    <ModalPopUp visible={open}> 
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}> 
            <Image
            source={require('../../../assets/x.png')}
            style={{height: 20, width: 20}}
            />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}> Ingrese su nueva contraseña</Text>
            <View style={styles.button}>
          <InputI
            placeHolder={"Password"} 
            isSecure={true}
            value={values.passwd}
            id={"email"}
            errorMessage={errors.passwd}
            onChangeText={handleChange('passwd')} //* Previous (email) =>setForgotEmail(email)    
          />
          </View>

          <View style={styles.button}>

          <TouchableOpacity   style={[styles.buttonPosta , {backgroundColor: disabled? '#FFFFFF' : '#32BB77' , borderColor: '#6A6A6A'}]} disabled={disabled}  onPress={handleSubmit}>
            <Text H2 style={[styles.buttonText , {color : disabled? '#6A6A6A' : '#FFFFFF'}]}>
              Enviar
            </Text>

            </TouchableOpacity>
                    
          </View>
       
        </View>
      </ModalPopUp>
        )}
      </Formik>


    );

  }

  const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer:{
        width: "80%",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation:20,
      },
      header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        marginBottom: 10,
    
      },
      button:{
        width: "80%",
        marginTop:30,  
    
      },
      buttonPosta: {
        alignSelf: 'center',
        paddingVertical: 10,
        marginVertical: 10,
        width: '75%',
        borderRadius: 32,
        borderColor: '#32BB77',
        borderWidth: 1,
        backgroundColor: '#32BB77'
      },
      buttonText:{
        color: '#f1f1f1',
        textAlign: 'center',
        fontSize: 18
      },
      title: {
          fontSize: 20,
          fontWeight: 'bold'
      }
  })