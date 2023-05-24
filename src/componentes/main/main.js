import { useContext } from "react"
import FirebaseContext from "../../contexts/FirebaseContext";
import Boton from "../boton";
import styled from "styled-components";
import Hero from "../hero";
import Categoria from "../categoria";
import { Formulario } from "../formulario";
import { Box, CircularProgress } from "@mui/material";

export const StyledContainerBoton = styled.section`
    display:flex;
    justify-content:space-between;
    padding: 0 1rem;
`
const Main = () =>{

    const {
        formulario,
        handledFormulario,
        isLoading,
        
    } = useContext(FirebaseContext)

    return (

        isLoading === true ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', opacity: 0.3 }}>
        <CircularProgress /></Box>:

        formulario === true ? <section>
            <Formulario/>
        </section> :
        <>
            <section><Hero/></section>
            <section><Categoria/></section>
            
            <StyledContainerBoton >
                <Boton onClick ={()=>handledFormulario('video')} botonTexto='Video'   ></Boton>
                <Boton onClick ={()=>handledFormulario('categoria')} botonTexto='Categoria' color="#9E9E9E"></Boton>
            </StyledContainerBoton>
        </> 
    )
}
export default Main