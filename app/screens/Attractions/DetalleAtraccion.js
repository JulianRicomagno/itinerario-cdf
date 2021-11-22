import React, { useState, useEffect, Component } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import COLORS from "../colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Rating } from 'react-native-elements';


import {GreenButton} from "../../components/buttonI";

export default function DetalleAtraccion({ route, navigation }) {
  const { item } = route.params;

  console.log(item);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}
    >
      <ImageBackground style={style.headerImage} source={{ uri: item.image }} />
      <View>
   

        <View style={{ marginTop: 20, paddingHorizontal: 20}}>
          <Text style={{ fontSize: 30, fontWeight: "bold", textAlign:'center' }}>{item.name}</Text>
          <View>
            <Rating    
                  style={{ paddingVertical: 10 }}
                  readonly 
                  startingValue={item.rating}
                  imageSize={20}
                />
            </View>
          <View style ={style.directionContainer}>
                    <Icon
                      name='room'
                      color='#32bb77' 
                      size={28}
                     />

                 <Text style={{ fontSize: 17, textAlign:'center', color: COLORS.grey, fontWeight: "bold"}}>
                    {item.address}
                  </Text>

            </View>
           

          <View style={{marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
              <Text style={{ fontSize: 20, textAlign:'justify' }}>
                {item.description}
              </Text>
          </View>
        </View>
  

        <View style={style.marginInfo}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Categoria:
          </Text>
          <View style={[style.tagInfo, {marginLeft: 50}]}>
            <Text style={{fontSize: 20, fontWeight: "bold", color: COLORS.grey}}>
              {item.typeAttraction}
            </Text>
          </View>
        </View>

        <View style={style.marginInfo}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Horario: 
          </Text>
          <View style={[style.tagInfo,{marginLeft: 70}]}>
            <Text style={{fontSize: 20, fontWeight: "bold", color: COLORS.grey, }}>
              {item.dateAndHour}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <GreenButton text={"AGREGAR"} onPress={() => navigation.navigate("myTrip", { item: item })} />
        </View>

      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  tagInfo: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 160,
    borderBottomLeftRadius: 160,
    overflow: "hidden",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  marginInfo: {
    marginTop: 20,
    flexDirection: "row", 
    justifyContent: "space-between",  
    paddingLeft: 20, 
    alignItems: "center"
  },
  direccion:{
    marginTop:10,
  },
  directionContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
     
  }
});
