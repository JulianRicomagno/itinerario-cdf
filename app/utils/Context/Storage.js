import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser , registerUser, fetchUser} from '../../api/PosadasApi';

import { Alert } from "react-native";

// Recibe un usuario, una acción con el usuario y un hook al cual correr.
export async function handleUser(action, hook, user){
    switch(action){
        case 'login' :
            loginUserStorage(user, hook)
            break;
        case 'logout' :
            removeUser(hook);
            break;
        case 'forceUpdate' :
            forceUpdateCredentials(hook);
            break;
        case 'updateLocal' :
            updateLocalCredentials(hook);
            break;
        case 'register' :
            register(user);
            break;
        case 'getUser' :
            getUser();
            break;
        case 'updateLocalUser':
            updateLocalUser(hook , user);
            break;
        case 'setLocalUser': // Busca el fetch del usuario al server y lo guarda localmente
            setLocalUser(hook);
            break;
        case 'getLocalUser':
            getLocalUser(hook);
            break;
        case 'updateGeneralInfo':
            updateGeneralInfo(user)
    }
}

// USEN CONTEXT EN LUGAR DE ESTO PERO BUENO SI QUIEREN TENER UNA LINEA MENOS DE IMPORT USEN ESTO
async function updateLocalUser(hook , user){
    hook({generalInfo : user}); //lol
}

async function getLocalUser(hook){
    return hook();
}

//  DE ACA EN ADELANTE YA SE PUEDEN USAR :).
async function setLocalUser(hook){
    fetchUser().then(
        res => {
            const user = res.data;
            hook({token: user.token , id: user.id, generalInfo: user.generalInfo , email: user.email,  itinerary : user.itinerary})
        }
    ).catch(
        error => {console.log(error); removeUser();} // TEÓRICAMENTE SI EL FETCH FALLA ES PORQUE O EL USUARIO NO EXISTE, EL TOKEN EXPIRÓ, O EL SERVER ESTÁ CAÍDO.
    );
}

async function addUser(data){
    try{
        const user = data.user;
        const myInfo = user.generalInfo
        await AsyncStorage.setItem('token' , data.token);
        await AsyncStorage.setItem('id' , user.id);
        await AsyncStorage.setItem('email', user.email);
        await AsyncStorage.setItem('name' , user.generalInfo.name);
        await AsyncStorage.setItem('lastName' , user.generalInfo.lastName);
        await AsyncStorage.setItem('age' , JSON.stringify(user.generalInfo.age));
        await AsyncStorage.setItem('country' , user.generalInfo.country);
        await AsyncStorage.setItem('nationality' , user.generalInfo.nationality);
        await AsyncStorage.setItem('city' , user.generalInfo.city);
        await AsyncStorage.setItem('gender' , user.generalInfo.gender);
    }catch(e){console.log(e);}
}

async function updateGeneralInfo(info) {
    try{
        await AsyncStorage.setItem('name' , info.name);
        await AsyncStorage.setItem('lastName' , info.lastName);
        await AsyncStorage.setItem('age' , info.age);
        await AsyncStorage.setItem('country' , info.country);
        await AsyncStorage.setItem('nationality' , info.nationality);
        await AsyncStorage.setItem('city' , info.city);
        await AsyncStorage.setItem('gender' , info.gender);

    }catch(err){console.log(err.msg)}

}

async function checkCredentials(){
    if(await AsyncStorage.getItem('token') != null){
        try{
            fetchUser()
                .then(response => {
                const data = response.data;
                if(data == null){
                    removeUser();
                    return false;
                }})
                .catch((error)=> {
                    console.log(error.message)
                })
                    
    }catch(e){console.log(e); await AsyncStorage.removeItem('token')}
    }
    return await AsyncStorage.getItem('token') != null;
}

async function removeUser(hook){
    try{
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('name' );
        await AsyncStorage.removeItem('lastName' );
        await AsyncStorage.removeItem('age' );
        await AsyncStorage.removeItem('country' );
        await AsyncStorage.removeItem('nationality' );
        await AsyncStorage.removeItem('city' );
        await AsyncStorage.removeItem('gender' );
        hook();
    }
    catch(e) {console.log(e)};
}

async function loginUserStorage(user , hook){
    const logged = await checkCredentials();
            if(!logged){
                try{
                    loginUser(user).then(function (response) {
                        const data = response.data;
                        addUser(data);
                        hook({token: data.token, id: data.user.id , generalInfo: data.user.generalInfo});
                      })
                      .catch(function (error) {
                        Alert.alert("Error","Datos incorrectos");
                      });
                }catch(e){console.log(e)}
            }else{
                hook(user);
            }
            
}

function register(user){
    try{
    registerUser(user)
        .then(response => {
            //console.log(JSON.stringify(response));
            if(JSON.stringify(response.status) == '200'){
                return alert('Registro exitoso.');
            }
            
        }).catch(e => {alert('Registro no completado, revise los datos ingresados e intente nuevamente.');})
    }catch(e){alert(e)};
};


// No usar este a menos que token e id estén llenos
async function forceUpdateCredentials(hook){
    try{
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    hook({token: token, id: id});
    }   catch(e){   
            console.log(e)}
}

async function updateLocalCredentials(hook){
    try{
        const logged = checkCredentials();
        if(!logged){
            removeUser();
        }else{
            let token = await AsyncStorage.getItem('token');
            let id = await AsyncStorage.getItem('id');
            hook({token: token, id: id});
        }
    }catch(e){console.log(e)}
}

async function getUser(){
    // La verdad a esta altura ya ni se qué estoy haciendo
    try{
        let data = await fetchUser()
            .then(response => {
                data = response.data;
                return data;
        })
    }catch(e){alert('Ocurrió un error.'); console.log(e)}
}