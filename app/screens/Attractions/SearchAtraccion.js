import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import {SearchBar} from 'react-native-elements';

export default function SearchAtraccion() {
        //Local
    const [atraccion, setAtraccion] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    const items = [
        {item: 'item1' , path: 'tobe'},
        {item: 'item2' , path: 'tobe'}
    ]
    
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
                <View style={{padding:20}}>
                    <SearchBar
                    placeholder="Search..."
                    onChangeText={(e)=> setSearch(e)}
                    value={search}
                    placeholderTextColor={'#0B3534'}
                    inputContainerStyle={styles.searchBarInput}
                    containerStyle={styles.searchBarContainer}
                    inputStyle={styles.searchBarInput}
                    searchIcon={{color: '#32BB77'}}
                    />
                </View>
                <View style={{flex: 1, flexDirection:'row', justifyContent:'center'}}>

                </View>
                <View>
                    <Text>Aca va el listado de  las atracciones ofrecidas</Text>
                    {atraccion.map((atra, idx) => (<Text key={idx}> {atra.name} </Text>))}
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        paddingVertical: 15,
        marginVertical: 10,
        width: '60%',
        borderRadius: 32,
        borderColor: '#32BB77',
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18
    },
    searchBarContainer :{ 
        borderColor: '#32BB77',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 45,
        borderWidth: 2,
        borderTopColor: '#32BB77',
        borderBottomColor: '#32BB77'
    },
    searchBarInput: {
        height: 30,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        color: '#0B3534'
    }
})