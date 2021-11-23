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






export default function UserInfo({navigation}) {
    
    const [generalInfo, setGeneralInfo] = useState({})
    const [visible, setVisible] = useState(false);
     
    useEffect(() => {
        getUsuario()
    }, [])

    async function getUsuario(){
        try{
            
            let myAge = await AsyncStorage.getItem('age');
            const myEmail = await AsyncStorage.getItem('email');
            const myName = await AsyncStorage.getItem('name');
            const mySurname = await AsyncStorage.getItem('lastName');
            const myNationality = await AsyncStorage.getItem('nationality');
            const myCountry = await AsyncStorage.getItem('country');
            const myCity = await AsyncStorage.getItem('city');
            const myGender = await AsyncStorage.getItem('gender');
            myAge = myAge.split('"' , 2)[1];
            const genInfo = {myAge, myEmail, myName, mySurname, myNationality, myCountry, myCity, myGender};
            setGeneralInfo(genInfo);
            //console.log(genInfo);
        }
        catch(e){console.log(e)}
    }

    const removeUser = useAuthRemoveContext();
    function logout(){
        setTimeout( () => {
            navigation.reset({index: 0 , routes: [{name: 'itinerary'}]})
            handleUser('logout' , removeUser);
        } , 600)
    }

    function editInfo(){
        navigation.navigate('edit', {userInfo: generalInfo} )
    }    
    
    const {myAge, myCity, myCountry, myGender, mySurname, 
        myName, myNationality, myEmail} = generalInfo;

    
    //todo Clear mock once tests are done
    /*const userInfo = {Pais: "Japon" , Ciudad: "Tokyo" , Gen: "Masculino"  , name: "Agustin" ,
        lastName: "Sorrentino" , nacionalidad: "Argentino", email: "sorren@gmail.com" , edad: "25" } */
    
    
    return (
        
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Información de Cuenta</Text>
            <View style={[styles.cardView,{height: 183}]}>
                <View style={styles.cardContainer}>
                 
                    <View>
                        <Text style={styles.title}>Nombre</Text>
                            <Text styles={styles.subtitle}>{myName} {mySurname} </Text>
                    </View>
                <View style={styles.lineView}/>
            
                    <View>
                        <Text style={styles.title}>Email</Text>
                            <Text styles={styles.subtitle}>{myEmail}</Text>
                    </View>
                <View style={styles.lineView}/>
                    <View>
                        <Text style={{...styles.title, alignSelf: 'flex-start'}}>Password</Text>
                            
                        <SmallButton
                        onPress={() => setVisible(true)}
                        text={'Editar'}
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
                            <Text styles={styles.subtitle}>{myAge}</Text>
                    </View>
                <View style={styles.lineView}/>

                    <View>
                        <Text style={styles.title}>Género</Text>
                            <Text styles={styles.subtitle}>{myGender}</Text>
                    </View>
                <View style={styles.lineView}/>
            
            
                    <View>
                        <Text style={styles.title}>Nacionalidad</Text>
                            <Text styles={styles.subtitle}>{myNationality}</Text>
                    </View>
                <View style={styles.lineView}/>
            
            
                    <View>
                        <Text style={styles.title}>País</Text>
                            <Text styles={styles.subtitle}>{myCountry}</Text>
                    </View>
                <View style={styles.lineView}/>
            
            
                    <View>
                        <Text style={styles.title}>Ciudad</Text>
                            <Text styles={styles.subtitle}>{myCity}</Text>
                    </View>
                <View style={styles.lineView}/>
            
                </View>
            </View>
            <EditPassModal open={visible} setVisible={()=> setVisible()} />
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