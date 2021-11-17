import { API_HOST } from '../utils/constants';
import axios from 'axios';
import { useAuthContext } from '../utils/Context/AuthContext';

// AL QUE SE LE OCURRA UNA SOLUCIÓN LE CHUPO LA VERGA

export async function loginUser(user){
    const url = `${API_HOST}api/auth/login`;
    console.log('busca');
    console.log(user);
    return axios.post(url , user);
  };
    //const retorno = axios({
    //    method: 'get',
    //    url:'http://10.0.0.2:8080/api/user/fetchall'
    //    }
    //);
    //return retorno //.then((response) => console.log('respuesta: ' + response.data)).catch((error) => console.log('error: ' + error));
    /*axios.post( url , {
        email: user.email,
        passwd: user.passwd,
        device: 'mobileApp',
    }).then(function (response) {console.log('hola' + response)}).catch(function (error) {console.log('error' + error)})*/
    
export function registerUser(user){
    const url = `${API_HOST}api/user/create`
    //console.log(user);
    return axios.post(url , {
        userName: user.userName,
        email: user.email,
        passwd: user.passwd,
        name: user.name,
        lastName: user.lastName,
        age: user.age,
        country: user.country,
        city: user.city,
        gender: user.gender,
        nationality: user.nationality,
    })
}


export async function getToken(){
    return await axios({
        method: 'get',
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
    method: 'get',
    url: 'https://www.universal-tutorial.com/api/countries/',
        headers: {
        "Authorization": `bearer ${token}`,
        "Accept": "application/json"
        }
    })
}

export async function getCities(token, country){
    return await axios({
    method: 'get',
    url: `https://www.universal-tutorial.com/api/states/${country} `,
        headers: {
        "Authorization": `bearer ${token}`,
        "Accept": "application/json"
        }
    })
}