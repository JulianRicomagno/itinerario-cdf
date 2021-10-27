import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar} from "react-native";
import {SearchBar} from 'react-native-elements';
import AttracItem from "../../components/attracItem";
import TagItem from "../../components/tagItem";

export default function SearchAtraccion() {
    const [atraccion, setAtraccion] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState('all');

    const tags = [
        {title: 'all' , id: 'all'},
        {title: 'alive' , id: 'alive'},
        {title: 'dead' , id: 'dead'},
        {title: 'unknown' , id: 'unknown'},
        {title: 'fillertext' , id: 'aa3'},
        {title: 'fillertext' , id: 'aa4'},
        {title: 'fillertext' , id: 'aa5'},
    ]
    
    async function buscarAtraccion() {
        const requestOptions = {
          method: "GET",
        }
        if(selectedId === 'all' ) {
            try{
                const atr = fetch(`https://rickandmortyapi.com/api/character/?name=${search}`, requestOptions)
                return atr
                    .then(res => res.json())
                    .then(data => {
                        setAtraccion(data.results);
                    })
                    .catch(error => console.log('Ocurrio un error ' + error));
            }catch(error){console.log(error.message);}
        } 
        try{
        const atr = fetch(`https://rickandmortyapi.com/api/character/?name=${search}&status=${selectedId}`, requestOptions);
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
    }, [search, selectedId]);

    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <View style={{padding:20}}>
                    <SearchBar
                    placeholder="Search Attractions..."
                    onChangeText={(e)=> setSearch(e)}
                    value={search}
                    placeholderTextColor={'#0B3534'}
                    inputContainerStyle={styles.searchBarInput}
                    containerStyle={styles.searchBarContainer}
                    inputStyle={styles.searchBarInput}
                    searchIcon={{color: '#32BB77'}}
                    />
                </View>
                <View style={{ flexDirection:'row', justifyContent:'center'}}>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            horizontal={true}
                            data={tags}
                            renderItem={renderTagItem}
                            keyExtractor={(item) => item.id}                            
                            showsHorizontalScrollIndicator={false}
                            extraData={selectedId}
                        />
                    </SafeAreaView>
                </View>
                {atraccion == undefined ?
                (<View>
                    <Text style={styles.primaryText}>No se encontraron resultados</Text>
                </View>) : (
                    <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={atraccion}
                                renderItem={renderAtracc}
                            />
                        </SafeAreaView>
                </View>)}
        </View>
    );

    function renderAtracc({ item })  {
        return(
            <AttracItem
                item={item}
                onPress={onPress()}/>   
        );
    }

    function renderTagItem({ item })  {
        const backgroundColor = item.id === selectedId ?  '#32BB77' : '#FFFFFF';
        const color = item.id === selectedId ? '#FFFFFF' : '#32BB77' ;

        return (
            <TagItem
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    
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
    },
    container: {
        flex : 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      secondaryText: {
        fontSize: 14,
        color: 'grey',
      },
});