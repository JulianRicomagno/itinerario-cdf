import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { WhiteButton } from '../buttonI';
import { useAuthRemoveContext , useAuthContext } from "../../utils/Context/AuthContext";
import {handleUser} from '../../utils/Context/Storage';
import { Text } from 'react-native-elements';


export default function UserInfo() {
    const user = useAuthContext();
    const userInfo = user.generalInfo;
    const removeUser = useAuthRemoveContext();
    console.log(user)
    function logout(){
        handleUser('logout' , removeUser);
    }
    // Hay que agregar un fetch porque si no voy a tener que poner 4 gigas de items xd
    // <Text>País: {userInfo.country}</Text>
    //<Text>Ciudad: {userInfo.city}</Text>
    //<Text>Nombre: {userInfo.name} {userInfo.lastName}</Text>
    //<Text>Email: {user.email}</Text>
    return (
        <ScrollView>         
            <WhiteButton
                onPress={logout}
                text="Logout"
            />
        </ScrollView>
    )
}
