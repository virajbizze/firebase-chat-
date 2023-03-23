import React , { useState} from 'react';
import { loginWithGoogle , logInWithCredentials } from '../services/firebase';


const AuthContext = React.createContext();

const AuthProvider = (props) => {
    // const [value , setValue] = useState()
    // var value
    const [user, setUser] = React.useState(null);

    const login = async () => {
        const user = await loginWithGoogle()
        if (!user) {
            // TODO: Handle failed login
            console.log("not registered")
        }

        setUser(user);
       
    };
    const loginWithIdCode = async () => {
        const user = await logInWithCredentials() 
        console.log("user" , user)
        if (!user) {
            // TODO: Handle failed login
            console.log("not registered")
        }
        
        setUser(user);
       
      
    };
    
    const value = { user, login , loginWithIdCode };
     return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
