import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ImageBackground, ScrollView, Image} from 'react-native';
import COLORS from "../colors"
import {GreenButton} from "../../components/buttonI";
import logo from "../../../assets/PosadasLogoHome.png";
import logoHome from "../../../assets/logoHome.jpg";

import { fetchUser } from "../../api/PosadasApi";

export default function General(props) {
    const { navigation }= props  

    /*const[loading,setLoading] = useState(true);
    const[user,setUser] = useState();
    const [tieneItinerario, setTieneItinerario] = useState();

    
    useEffect(() =>{
      getUsuario();
      setTimeout(() =>{
        setLoading(false);
      },400)
    },[])

    useEffect(() => {
      if(user != null){
        verificarItinerario();
        console.log("entree")
      }
    }, [user])

    if(loading){
      return(
        <View />
      )
    }

    function getUsuario(){
      fetchUser().then(res =>{
          setUser(res.data);
      }).catch(error => {});
    }

    function verificarItinerario(){
      setTieneItinerario(user.itinerary.dayFrom !== '');
    }*/

    return (  
    <View
      style={{backgroundColor: '#FFFFFF'}}
        //showsVerticalScrollIndicator={false}
        /*contentContainerStyle={{
          backgroundColor: COLORS.white,
          paddingBottom: '18%',
        }}  */
      >
        <ImageBackground style={styles.headerImage} source={logoHome} />
            <View style={{backgroundColor: '#FFFFFF'}}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo} />
                </View>
                <View style={styles.buttonContainer}>
                    <GreenButton onPress={() => navigation.navigate("createItineraty")} text={"Crear itinerario"} > </GreenButton>
                    <GreenButton onPress={() => navigation.navigate("searchAtraccion")} text={"Explorar"} > </GreenButton>  
              </View> 
            </View>
    </View>
    )
}

const styles =  StyleSheet.create ({
    headerImage: {
        height: 350,
        borderBottomRightRadius: 150,
        borderBottomLeftRadius: 150,
        overflow: "hidden",
    },
    logo: {
        width: "100%",
        height: 110,      
        resizeMode: "contain",
        //marginBottom: 20,
      },
      logoContainer:{
          marginRight: 100,
          marginTop: 15,
          marginRight:10
      },
      buttonContainer:{
          marginTop:5,
          //marginBottom: 50,
      }
})
