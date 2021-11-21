import { API_HOST } from '../utils/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginUser(user){
    const request = {
        url: `${API_HOST}public-api/auth/login`,
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        data:{
            email: user.email,
            passwd: user.passwd,
            device: 'mobileApp',
        }
    }
    return axios(request);
  };

  export async function fetchUser(){
      // Por algún motivo el Content-Length es importante
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id')
      const request ={
        url: `${API_HOST}api/usertourist/search/${id}`,
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Content-Length' : token.length,
            'x-token' : token
        },
      }
      return await axios(request);
  }
    
export function registerUser(user){
const request = {
    url : `${API_HOST}public-api/usertourist/create`,
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json',
    },
    data:{
            userName: user.userName,
            email: user.email,
            passwd: user.passwd,
            name: user.name,
            lastName: user.lastName,
            age: user.age,
            country: user.country,
            city: user.city,
            gender: user.gender,
        }
    }
    return axios(request)
}


export async function getToken(){
    return await axios({
        method: 'GET',
        url: 'https://www.universal-tutorial.com/api/getaccesstoken',
        headers: {
            "Accept": "application/json",
            "api-token": "UywfGTVaISQviEE6aZtvNOLKmGgBhkRGsBDvT4Sg3UwfI5hQMMpeYRoAmE237O2dtDw",
            "user-email": "aa.sorrentino94@gmail.com"
        }
    })
}

    
export async function getCountries(token){
    return await axios({
    method: 'GET',
    url: 'https://www.universal-tutorial.com/api/countries/',
        headers: {
        "Authorization": `bearer ${token}`,
        "Accept": "application/json"
        }
    })
}

export async function getCities(token, country){
    return await axios({
    method: 'GET',
    url: `https://www.universal-tutorial.com/api/states/${country} `,
        headers: {
        "Authorization": `bearer ${token}`,
        "Accept": "application/json"
        }
    })
}



export async function forgotPassword(data){
    console.log(data)
   
    return await axios({
       
        method: 'POST',
        url: `${API_HOST}public-api/auth/recuperarpassword`,
        headers: {
            'Content-Type' : 'application/json',
        },
        data:{
            "email":data,
            "device": 'mobileApp',
        }
        
export async function getAllAttractions(){

    const token = await AsyncStorage.getItem('token');

    return await axios({
        method: 'GET',
        url: `${API_HOST}api/attraction/fetchall`,
        headers: {
            'Content-Type' : 'application/json',
            'x-token': token
        },
    })
}

export async function getAttractionsByType(type){

    const token = await AsyncStorage.getItem('token');
    return await axios({
        method: 'GET',
        url: `${API_HOST}api/attraction/searchbytype/${type}`,
        headers: {
            'Content-Type' : 'application/json',
            'x-token': token,
        }});
}

export async function getAttractionsByName(name){

    const token = await AsyncStorage.getItem('token');
    return await axios({
        method: 'GET',
        url: `${API_HOST}api/attraction/searchbyname/${name}`,
        headers: {
            'Content-Type' : 'application/json',
            'x-token': token,
        }});
}

export async function getAttractionsTypes(){

    const token = await AsyncStorage.getItem('token');

    return await axios({
      url:  `${API_HOST}api/attraction/types`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token, 
      },
    })

}

