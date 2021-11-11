import { API_HOST } from '../utils/constants';
import axios from 'axios';
import { useAuthContext } from '../utils/Context/AuthContext';

// AL QUE SE LE OCURRA UNA SOLUCIÓN LE CHUPO LA VERGA

export async function loginUser(user){
    const url = `${API_HOST}api/auth/login`;
    console.log('busca');
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
    console.log(user);
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
    })
}