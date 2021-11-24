import React from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import COLORS from "../colors"
import {GreenButton} from "../../components/buttonI";
import logo from "../../../assets/PosadasLogoHome.png";
import logoHome from "../../../assets/logoHome.jpg";

export default function General(props) {
    const { navigation }= props  

    return (  
    <View
      style={{backgroundColor: '#FFFFFF',  width: '100%' , height: '100%'}}
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
      },
      logoContainer:{
          marginRight: 100,
          marginTop: 15,
          marginRight:10
      },
      buttonContainer:{
          marginTop:5,
      }
})
