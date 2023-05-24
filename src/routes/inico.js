import { getAuth, onAuthStateChanged } from "firebase/auth";
import App from "../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




export default function Inicio (){

    const navigate = useNavigate()
    const [uidUser, setUidUser] = useState('')
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUidUser(user.uid);
           
            // ...
        } else {
            // User is signed out
            // ...
            navigate('/loging')
        }
    });
    
    return <App uidUser = {uidUser}/>

}
