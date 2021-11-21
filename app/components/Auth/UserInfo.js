import React from 'react';
import {useEffect, useState} from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native'
import { WhiteButton, GreenButton } from '../buttonI';
import { useAuthRemoveContext , useAuthContext } from "../../utils/Context/AuthContext";
import {handleUser} from '../../utils/Context/Storage';
import { Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import {fetchUserById} from '../../api/PosadasApi'





export default function UserInfo({navigation}) {
    
    //const user = useAuthContext();
    const [generalInfo, setGeneralInfo] = useState()
    
    useEffect(() => {
        fetchUserById()
         .then(response => {
            setUser(response);
            //console.log(user.data);
         })
         .catch(err => {
             console.log(err.msg)
         })
    }, [])

    //const userInfo = ugeneralInfo;
    const removeUser = useAuthRemoveContext();
    function logout(){
        handleUser('logout' , removeUser);
    }

    function editInfo(){
        //setGeneralInfo(mock);
        navigation.navigate('edit', {userInfo: mock} )
    }




    const mock = {Pais: 'Brazil', Ciudad: 'Bahia', Gen: 'Masculino', name: 'Agustin',
    lastName: 'Sorrentino', nacionalidad: 'Argentina', email: 'sorren@gmail.com', edad: '25' }


    // Hay que agregar un fetch porque si no voy a tener que poner 4 gigas de items xd
    // <Text>País: {userInfo.country}</Text>
    //<Text>Ciudad: {userInfo.city}</Text>
    //<Text>Nombre: {userInfo.name} {userInfo.lastName}</Text>
    //<Text>Email: {user.email}</Text>
    /*<Text>Nombre: {userInfo.name} , {user.lastName}</Text>
            <Text>Genero: {userInfo.gender}</Text>
            <Text>Nacionalidad: {userInfo.nationality}</Text>
            <Text>País: {userInfo.country}</Text>
            <Text>Ciudad: {userInfo.city}</Text>*/
    

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Información de Cuenta</Text>
            <View style={[styles.cardView,{height: 130}]}>
                <View style={styles.cardContainer}>
                 <TouchableOpacity>
                    <View>
                    <Text style={styles.title}>Nombre</Text>
                        <Text styles={styles.subtitle}>{mock.name} {mock.lastName}</Text>
                    </View>
                <View style={styles.lineView}/>
            </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Email</Text>
                        <Text styles={styles.subtitle}>{mock.email}</Text>
                </View>
                <View style={styles.lineView}/>
                </View>
            </View>


            <Text style={styles.header}>Información Personal</Text>
            <View style={[styles.cardView,{height: 260}]}>
                <View style={styles.cardContainer}>    
            <TouchableOpacity>
                <View>
                    <Text style={styles.title}>Género</Text>
                        <Text styles={styles.subtitle}>{mock.Gen}</Text>
                </View>
                <View style={styles.lineView}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Text style={styles.title}>Nacionalidad</Text>
                        <Text styles={styles.subtitle}>{mock.nacionalidad}</Text>
                </View>
                <View style={styles.lineView}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Text style={styles.title}>País</Text>
                        <Text styles={styles.subtitle}>{mock.Pais}</Text>
                </View>
                <View style={styles.lineView}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Text style={styles.title}>Ciudad</Text>
                        <Text styles={styles.subtitle}>{mock.Ciudad}</Text>
                </View>
                <View style={styles.lineView}/>
            </TouchableOpacity>
                </View>
            </View>
            <GreenButton
            text={'Editar Informacion'}
            onPress={editInfo}
            />    
            <WhiteButton
                onPress={logout}
                text="Logout"
            />
        </ScrollView>
    )
}
const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
    },
    title: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        letterSpacing: 1,
    },
    header: {
        flex: 1,
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 105,
        marginBottom: 5,
        letterSpacing: 1,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    subtitle:{
        flex: 1,
        marginLeft: 5,
    },
    lineView: {
        flex: 1,
        height: 0.5,
        marginBottom: 20,
    },
    cardView: {
        flex: 1,
        width: '80%',
        borderRadius: 7,
        backgroundColor: '#f1f1f1',
        elevation: 3,
        alignSelf: 'center',
        marginBottom: 10
    },
    cardContainer: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    }
})