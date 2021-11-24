import React from 'react';
import {useEffect, useState} from 'react'
import { ScrollView} from 'react-native-gesture-handler';
import { View } from 'react-native'
import { WhiteButton, GreenButton, SmallButton } from '../../components/buttonI';
import {EditPassModal} from '../../components/Auth/EditPassModal'
import { useAuthRemoveContext  } from "../../utils/Context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleUser} from '../../utils/Context/Storage';
import { Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import {fetchUser} from "../../api/PosadasApi"





export default function UserInfo({navigation}) {
    
    //const [generalInfo, setGeneralInfo] = useState({})
    const [visible, setVisible] = useState(false);
    const [user,setUser] = useState({});
    const [account,setAccount] =useState({})
     
    useEffect(() => {
        getUsuario()
    }, [])


    async function getUsuario(){
        fetchUser().then(res =>{
            setUser(res.data.generalInfo);
            setAccount(res.data);
        }).catch(() => {
            alert("Error al conectar con la base de datos");
        });
    }

    const removeUser = useAuthRemoveContext();
    function logout(){
        navigation.reset({index: 0 , routes: [{name: 'itinerary'}]})
        handleUser('logout' , removeUser);
    }

    function editInfo(){
        navigation.navigate('edit', {userInfo: {
            myAge: user.age,
            myCity: user.city,
            myCountry: user.country, 
            myGender: user.gender,
            mySurname: user.lastName,
            myName: user.name,
            myNationality: user.nationality,
            myEmal: account.email,
        }} )
    }    
       
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Información de Cuenta</Text>
            <View style={[styles.cardView,{height: 183}]}>
                <View style={styles.cardContainer}>
                    <View>
                        <Text style={styles.title}>Nombre</Text>
                            <Text styles={styles.subtitle}>{user.name} {user.lastName} </Text>
                    </View>
                <View style={styles.lineView}/>
            
                    <View>
                        <Text style={styles.title}>Email</Text>
                            <Text styles={styles.subtitle}>{account.email}</Text>
                    </View>
                <View style={styles.lineView}/>
                    <View>
                        <Text style={{...styles.title, alignSelf: 'flex-start'}}>Password</Text>
                            
                        <SmallButton
                        onPress={() => setVisible(true)}
                        text={'Cambiar'}
                        />    
                    </View>
                <View style={styles.lineView}/>
                </View>
            </View>
            <Text style={styles.header}>Información Personal</Text>
            <View style={[styles.cardView,{height: 285}]}>
                <View style={styles.cardContainer}>    
            
                    <View>
                        <Text style={styles.title}>Edad</Text>
                            <Text styles={styles.subtitle}>{user.age}</Text>
                    </View>
                <View style={styles.lineView}/>

                    <View>
                        <Text style={styles.title}>Género</Text>
                            <Text styles={styles.subtitle}>{user.gender}</Text>
                    </View>
                <View style={styles.lineView}/>
            
            
                    <View>
                        <Text style={styles.title}>Nacionalidad</Text>
                            <Text styles={styles.subtitle}>{user.nationality}</Text>
                    </View>
                <View style={styles.lineView}/>
            
            
                    <View>
                        <Text style={styles.title}>País</Text>
                            <Text styles={styles.subtitle}>{user.country}</Text>
                    </View>
                <View style={styles.lineView}/>
            
            
                    <View>
                        <Text style={styles.title}>Ciudad</Text>
                            <Text styles={styles.subtitle}>{user.city}</Text>
                    </View>
                <View style={styles.lineView}/>
            
                </View>
            </View>
           
            <EditPassModal open={visible} setVisible={()=> setVisible()} />
            <GreenButton
            text={'Editar Información'}
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
        //marginRight: 105,
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
        marginBottom: 10,
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
    },
})