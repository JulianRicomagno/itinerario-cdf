import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser , registerUser, updateUser} from '../../api/PosadasApi';

async function addUser(data){
    try{
        const user = data.user;
        await AsyncStorage.setItem('token' , data.token);
        await AsyncStorage.setItem('id' , user.id);
/*      
        await AsyncStorage.setItem('name' , user.generalInfo.name);
        await AsyncStorage.setItem('lastName' , user.generalInfo.lastName);
        await AsyncStorage.setItem('age' , user.generalInfo.age);
        await AsyncStorage.setItem('country' , user.generalInfo.country);
        await AsyncStorage.setItem('nationality' , user.generalInfo.nationality);
        await AsyncStorage.setItem('city' , user.generalInfo.city);
        await AsyncStorage.setItem('gender' , user.generalInfo.gender);
*/
    }catch(e){console.log(e);}
}

async function checkCredentials(){
    if(await AsyncStorage.getItem('token') != null){
        try{
            updateUser().then(response => {
                const data = response.data;
                AsyncStorage.setItem('token' , data.token);
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
        case 'updateLocal' :
            console.log('updateLocal');
            updateLocalCredentials(hook);
            break;
        case 'register' :
            console.log('register');
            register(user);
            break;
        case 'updateApi' :
            console.log('updateApi');
            updateApi(hook)
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

async function updateApi(hook){
    // La verdad a esta altura ya ni se qué estoy haciendo
    try{
        updateUser().then(response => {
            const data = response.data;
            addUser(data);
            hook({generalInfo: data.user.generalInfo});
            return data;
        })
    }catch(e){alert('Ocurrió un error.')}
}