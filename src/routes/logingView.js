import { getAuth, browserSessionPersistence, setPersistence,  signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../componentes/inputs/index.js";
import Boton from "../componentes/boton/index.js";

import Footer from "../componentes/footer/index.js";
import Header from "../componentes/header/index.js";
import styled from "styled-components";
import { DataProvider } from "../contexts/FirebaseProvider.js";

const StyledForm =styled.form`
    margin:3rem 1rem;

`
export default function LogingView(){

    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const auth = getAuth();

    const  HandleSignIn = (e)=>{
        e.preventDefault();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {

                return signInWithEmailAndPassword(auth, email, password);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode,errorMessage)
            });

        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            console.log(user)
            
            navigate('/')
            // ...
        })
        .catch((error) => {
            console.log(email,password, 'error')
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode,errorMessage)
        });
    }

    return(
        <>  <DataProvider>
            <Header/>
            </DataProvider>
            <StyledForm onSubmit={HandleSignIn}>
                <Input label='Correo' name='correo' actualizarValor={setEmail} valor={email}></Input>
                <Input label='Contraseña' name='pass' actualizarValor={setPassword} valor={password}></Input>
                <Boton botonTexto='Ingresar' type='submit'></Boton>
            </StyledForm>
            <Footer />
        </>
    )

 

}