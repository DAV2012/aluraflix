import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
import Input from "../inputs";
import Boton from "../boton";
import ListaDesplegable from "../listaDesplegable"
import styled from "styled-components"; 
import Tabla from "../tabla/tabla";
import { StyledContainerBoton } from "../main/main";
import { Alert, Snackbar } from "@mui/material";


const StyledFormulario = styled.form`
    
    display: block;
    box-sizing:border-box;
    padding: 0 1rem;
    & > h2 {
        font-weight: 400;
        font-size: 35px;
        line-height: 41px;
        text-align: center;
        margin: 2rem 0;
    }
`

export const Formulario = ()=>{
    const{
        getDataEdit,
        documentsCategoria,
        typeformulario,
        handledFormulario,
        handleOnSubmit,
        formRef,
        setAlert,
        severity,
        alertMensaje,
        alert,
        categoriaList,
        setCategoriaList,
        setUid,
        headerRef,

        
    } = useContext(FirebaseContext)

    const [titulo,setTitulo] = useState('');
    const [linkVideo,setLinkVideo] = useState('');
    const [linkImagen,setLinkImagen] = useState('');
    const [color,setColor] = useState('#E864D0');
    const [descripcion,setDescripcion] = useState('');
    const [categoria,setCategoria] = useState('')
    

    

    const handledEdit =(uid)=>{
        
        const focus = headerRef.current
        focus.scrollIntoView({ behavior: "smooth" });
        
        getDataEdit(typeformulario,uid) 
        .then(({titulo,linkVideo,linkImagen,descripcion,categoria})=>{
            setTitulo(titulo)
            setLinkVideo(linkVideo)
            setLinkImagen(linkImagen)
            setDescripcion(descripcion)
            setCategoriaList(categoria)
            setCategoria(categoria)
            setUid(uid);
        })


    }
    const updateFunctions = {
        descripcion: setDescripcion,
        categoria : setCategoria,
        titulo: setTitulo,
        linkVideo: setLinkVideo,
        linkImagen: setLinkImagen,
    }
    const form = {
        video:
        {
        descripcion:descripcion,
        titulo : titulo,
        linkVideo:linkVideo,
        linkImagen:linkImagen,
        },
        categoria:
        {
            categoria: categoria,
            descripcion: descripcion, 
        }
    };
    const label ={
        descripcion: 'Descripción',
        categoria : 'Categoria',
        titulo: 'Titulo',
        linkVideo: 'Link del video',
        linkImagen: 'Link imagem del video',
    }
    useEffect(()=>{
        setColor('#E864D0');
        setCategoria('');
        setDescripcion('');
        setTitulo('');
        setLinkVideo('');
        setLinkImagen('');
        setUid('');



    },[alert,typeformulario,setUid])
    return (
        <>
            <StyledFormulario  onSubmit={handleOnSubmit} ref={formRef}>
                <Snackbar 
                    open={alert} 
                    spacing={2}
                    autoHideDuration={3000}
                    onClose={() => {setAlert(false)}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert 
                        onClose={() => {setAlert(false)}}
                        variant="filled" 
                        severity={severity}
                    >
                        {alertMensaje}
                    </Alert>
                </Snackbar>
                <h2 id="tituloForm">Crear {typeformulario}</h2>
                {   
                    Object.entries(form[typeformulario]).map(([key, value], index) => {
                        return <Input key ={index}  name = {key} required valor={value} actualizarValor = {updateFunctions[key]} id ={index} label={label[key]}></Input>
                    })  
                }
                { typeformulario === 'video' && <ListaDesplegable name='categoriaList' required valor={categoriaList}  categorias ={documentsCategoria} label='Categoria'/>}
                { typeformulario === 'categoria' && <Input  type='color' name = 'color' required valor={color} actualizarValor = {setColor} label= 'color de la categoria'></Input>}
                <StyledContainerBoton>
                    <Boton type ='submit' botonTexto= 'Guardar'></Boton>
                    <Boton type='button' botonTexto='Cancelar'onClick={()=>handledFormulario('')}  color="#9E9E9E" ></Boton>
                </StyledContainerBoton>
            </StyledFormulario>
            <Tabla  handledEdit={handledEdit}></Tabla>
        </>
    );
}


