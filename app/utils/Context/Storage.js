import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser , registerUser} from '../../api/PosadasApi';

async function addUser(token , id){
    try{
        await AsyncStorage.setItem('token' , token);
        await AsyncStorage.setItem('id' , id);
    }catch(e){console.log(e);}
}

async function checkCredentials(){
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
                        console.log(data);
                        const token = data.token;
                        const id = data.user.id;
                        addUser(token , id);
                        hook({token: token, id: id , generalInfo: data.user});
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

// Recibe un usuario, una acción con el usuario y un hook al cual correr.
export async function handleUser(action, hook, user){
    switch(action){
        case 'login' :
            loginUserStorage(user, hook)
            break;
        case 'logout' :
            removeUser(hook);
            console.log('logout');
            break;
        case 'forceUpdate' :
            forceUpdateCredentials(hook);
            console.log('forceUpdate');
            break;
        case 'update' :
            console.log('update');
            updateCredentials(hook);
            break;
        case 'register' :
            console.log('register');
            register(user);
            break;
    }
}

// No usar este a menos que token e id estén llenos
async function forceUpdateCredentials(hook){
    try{
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    hook({token: token, id: id});
    }   catch(e){   
            console.log(e)}
}

async function updateCredentials(hook){
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