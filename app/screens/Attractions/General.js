import React from 'react';
import {View, StyleSheet, ImageBackground, ScrollView, Image} from 'react-native';
import COLORS from "../colors"
import {GreenButton} from "../../components/buttonI";
import logo from "../../../assets/PosadasLogoHome.png";

export default function General(props) {
    const { navigation }= props  
    
    return (  
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: COLORS.white,
          paddingBottom: 50,
        }}  
      >
        <ImageBackground style={styles.headerImage} source={{ uri: "https://s3-alpha-sig.figma.com/img/c901/6668/0e08ccdad94419c9aebd33aa37cfb2f9?Expires=1638748800&Signature=NGm0twSS248J0OCHZYJzWzb3MxvRJiXnhux8zjOvEt5niabAgolPVnaPtSM6LuBPAxbGfMx98tlDOW4ew1TLGSQmgdMDNyW08up8yv74WUmGV5mb-TY3oAbPhTmDAwIKiL1x2~XFAGUuRlxbYkW9ioKCflk3caP6GDP8YJzcA4qnuVl7OM4OQye-h1PhcWHdRcA96q2MRlNYzRzPS6jPJj1MNYrgnh9witYzlwFPf7LCya9tBSkhz8lEaeAu4uM0fXwc8Emv0vCTxv5VSowCzSKPDxShZT5ngnRvS6jIN4Gozf8MevaVgutxomaYQLc9mLPu6O6n0O50PVeK~oOFAw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"}} />
            <View style={{backgroundColor: '#FFFFFF'}}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo} />
                     
                </View >
                <View style={styles.buttonContainer}>
                    <GreenButton onPress={() => navigation.navigate("createItineraty")} text={"Crear itinerario"} > </GreenButton>
                    <GreenButton onPress={() => navigation.navigate("searchAtraccion")} text={"Explorar"} > </GreenButton>  
              </View> 
            </View>
    </ScrollView>
    )
}

const styles =  StyleSheet.create ({
    viewBody : {
      flex : 1 ,
      backgroundColor : "#FFFFFF" ,
    },
    bottom:{
        margin: 50,
    },
    headerImage: {
        height: 350,
        borderBottomRightRadius: 170,
        borderBottomLeftRadius: 170,
        overflow: "hidden",
    },
    logo: {
        width: "100%",
        height: 110,      
        resizeMode: "contain",
        marginBottom: 20,
      },
      logoContainer:{
          marginRight: 100,
          marginTop: 15,
          marginRight:10
      },
      buttonContainer:{
          marginTop:10,

      },
      bienvenidos:{
       fontSize: 26, 
       fontWeight: "bold",
       color: "#19523E",
      
      },
      TextContainer:{
        display: "flex",
      }
})
