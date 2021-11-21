import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser , registerUser, fetchUser} from '../../api/PosadasApi';

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
            hook({token: user.token , id: user.id, generalInfo: user.generalInfo , itinerary : user.itinerary})
        }
    ).catch(
        error => {console.log(error); removeUser();} // TEÓRICAMENTE SI EL FETCH FALLA ES PORQUE O EL USUARIO NO EXISTE, EL TOKEN EXPIRÓ, O EL SERVER ESTÁ CAÍDO.
    );
}

async function addUser(data){
    try{
        const user = data.user;
        await AsyncStorage.setItem('token' , data.token);
        await AsyncStorage.setItem('id' , user.id);
    }catch(e){console.log(e);}
}

async function checkCredentials(){
    if(await AsyncStorage.getItem('token') != null){
        try{
            fetchUser().then(response => {
                const data = response.data;
                if(data == null){
                    removeUser();
                    return false;
                }
        })}catch(e){console.log(e); await AsyncStorage.removeItem('token')}
    }
    return await AsyncStorage.getItem('token') != null;
}

async function removeUser(hook){
    try{
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
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
                        alert('Login correcto.');
                      })
                      .catch(function (error) {
                        alert(error.message);
                      });
                }catch(e){console.log(e)}
            }else{
                hook(user);
                alert('Logeado.');
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