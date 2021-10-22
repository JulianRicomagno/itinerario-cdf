import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";


export default function SearchAtraccion() {
        //Local
    const [atraccion, setAtraccion] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    
    async function buscarAtraccion() {
        const requestOptions = {
          method: "GET",
        }
        try{
        const atr = fetch('https://rickandmortyapi.com/api/character', requestOptions);
        return atr
          .then(res => res.json())
          .then(data => {
            console.log(data.results);
            setAtraccion(data.results);
            
          })
          .catch(error => console.log('Ocurrio un error' + error));
        }catch(error){console.log(error.message);}
      }
    
    
    useEffect(() =>{
        setTimeout(()=>{
            buscarAtraccion();
        setIsLoading(false);
        },400);
    }, []);

    
    return (
        <View>
            <Text>Aca va el listado de  las atracciones ofrecidas</Text>
            {console.log(atraccion)}
            {atraccion.map((atra, idx) => (<Text key={idx}> {atra.name} </Text>))}

          

      
            
        </View>
    )
}