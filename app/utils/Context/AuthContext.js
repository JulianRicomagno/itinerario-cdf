import React , {useContext, createContext, useState} from 'react';

const AuthContext = createContext();
const AuthUpdateContext = createContext();
const AuthRemoveContext = createContext();

export function useAuthContext(){
    return useContext(AuthContext);
}

export function useAuthUpdateContext(){
    return useContext(AuthUpdateContext);
}

export function useAuthRemoveContext(){
    return useContext(AuthRemoveContext);
}

export function AuthProvider({children}){   
    const [user, setUser] = useState({token: '' , id: '', generalInfo : {} , itinerary : {}});

    function updateUser(receivedUser){
        setUser(receivedUser);
    }
    function removeUser(){
        setUser({token: '' , id: '', generalInfo : {} , itinerary : {}})
    }

    return(
        <AuthContext.Provider value={user}>
            <AuthUpdateContext.Provider value={updateUser}>
                <AuthRemoveContext.Provider value={removeUser}>
                    {children}
                </AuthRemoveContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}
