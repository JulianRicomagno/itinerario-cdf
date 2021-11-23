import React,  { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import General from "../screens/Attractions/General";
import CreateItineraty from "../screens/Attractions/CreateItineraty";
import DetalleAtraccion from "../screens/Attractions/DetalleAtraccion";
import MyTrip from "../screens/Attractions/MyTrip";
import SearchAtraccion from "../screens/Attractions/SearchAtraccion";
import {handleUser} from "../utils/Context/Storage";
import { useAuthContext } from "../utils/Context/AuthContext";
import { fetchUser } from "../api/PosadasApi";



const Stack = createStackNavigator();

export default function ItineraryStack() {
    const userContext = useAuthContext();
    const [tieneItinerario, setTieneItinerario] = useState();
 
    const [user , setUser] = useState();
  
     function verificarItinerario(){
      setTieneItinerario(user.itinerary.dayFrom !== '');
    }
  
    function getUsuario(){
        fetchUser().then(res =>
            {
                setUser(res.data);
            }).catch(error => {});
    }
  
    useEffect(() => {
        getUsuario();
    }, [])
  
    useEffect(() => {
      if(user != null){
        verificarItinerario();
      }
    }, [user])




    if(tieneItinerario){
        return(
            <Stack.Navigator 
            >  
               <Stack.Screen 
                    name="myTrip" 
                    component={MyTrip} 
                    options={{title: "Mi viaje", headerShown: false}}/>
              
                <Stack.Screen 
                    name="detalleAtraccion" 
                    component={DetalleAtraccion} 
                    options={{title: "Detalle Atraccion", headerShown: true}}/>
               
                <Stack.Screen 
                    name="searchAtraccion" 
                    component={SearchAtraccion} 
                    options={{title: "Buscar Atracciones", headerShown: false}}/> 
            </Stack.Navigator>
        )
        
    }else{
        return(
            <Stack.Navigator 
            >  
                <Stack.Screen 
                    flag={tieneItinerario}
                    name="Inicio" 
                    component={General} 
                    options={{title: "Inicio", headerShown: false}}
                    /> 
                <Stack.Screen 
                    name="createItineraty" 
                    component={CreateItineraty} 
                    options={{title: "Crear Itinerario", headerShown: false}}
                    />
                <Stack.Screen 
                    name="detalleAtraccion" 
                    component={DetalleAtraccion} 
                    options={{title: "Detalle Atraccion", headerShown: true}}/>
                <Stack.Screen 
                    name="myTrip" 
                    component={MyTrip} 
                    options={{title: "Mi viaje", headerShown: false}}/>
                <Stack.Screen 
                    name="searchAtraccion" 
                    component={SearchAtraccion} 
                    options={{title: "Buscar Atracciones", headerShown: false}}/> 
            </Stack.Navigator>
        )
    }
        
    }
  
