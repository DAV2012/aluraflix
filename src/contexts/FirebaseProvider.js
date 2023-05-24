
import { initializeApp } from "firebase/app";
import {  getAuth} from "firebase/auth"
// import { getStorage} from "firebase/storage"
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, deleteDoc, updateDoc, orderBy, limit, serverTimestamp } from "firebase/firestore"
import FirebaseContext from "./FirebaseContext";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import {v4 as uuidv4} from 'uuid'







export const firebaseConfig = {
    apiKey: process.env.REACT_APP_APYKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
const db = getFirestore(app)
// const storage = getStorage(app)


const DataProvider = ({ children,uidUser }) => {

    


    ///////////////////////////////////7
    const formRef = useRef(null)
    const headerRef = useRef(null)
    
    const [documentsCategoria, setdocumentsCategoria] = useState([]);
    const [documentsVideos, setdocumentsVideos] = useState([]);
    const [datos,setData] =useState([])
    const [uid,setUid] = useState('')
    const [actualizarDatos, setActualizarDatos] = useState(true)
    
    
    const [alertMensaje,setAlertMensaje] = useState('')
    const [severity, setSeverity] = useState('success')
    const [alert, setAlert]=useState(false);
    
    const [formulario, setformulario] = useState(false)
    const [typeformulario, setTypeFormulario] = useState('')

    const [categoriaList, setCategoriaList]= useState('');
    const [isLoading, setIsLoading] = useState();
    const [idHero, setIdHEro] = useState('');
    
    ///////// llamados a firebase
    
    // Realizar consultas o inicializar listeners aquí
    const getData = async (dataCollection) => {

        const docRef = collection(db, dataCollection)

        const q = query(docRef, orderBy('time', 'desc'), limit(12))

        const querySnapshot = await getDocs(q)

        const data = querySnapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
        }));
        return data
    };




    ///// se hace la consulta para traer los datos antiguos
    const getDataEdit = async (dataCollection, uid) => {
        const docRef = doc(db, dataCollection, uid)

        const querySnapshot = await getDoc(docRef)

        if (querySnapshot.exists()) {

            const data = querySnapshot.data()
            data.uid = querySnapshot.id;

            return data

        } else {
            console.log("No such document!");
        }
    }

    //////////// Se realiza el update a la base de datos
    const upDate = async (dataCollection, uid, data) => {

        const docRef = doc(db, dataCollection, uid);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, data);
    }

    ////// crear nueva entrada
    const deleteData = async (dataCollection, uid) => {

        await deleteDoc(doc(db, dataCollection, uid));
    }

    ////// crear nueva entrada
    const createData = async (data, dataCollection) => {

        try {
            data.time = serverTimestamp()
            const docRef = collection(db, dataCollection);

            await addDoc(docRef, data)

        } catch (error) {
            console.error(error)
        }
    }



    useEffect(()=>{

        setIsLoading(true)


        if(typeformulario !==''){
            getData(typeformulario)
            .then((res) => {setData(res)})

        }else{
            getData('video')
                .then((res) => setdocumentsVideos(res))
            .then(()=>getData('categoria')
                .then((res) => setdocumentsCategoria(res))
            )
        }
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);


        



    },[actualizarDatos,typeformulario])

        const  handledFormulario = (infcollection) => {
            setformulario(!formulario)
            setTypeFormulario(infcollection)
            setActualizarDatos(!actualizarDatos)
        }

        const handledDelete = (uid)=>{

            setIsLoading(true);
            deleteData(typeformulario, uid)
            .then((rep)=>{
                setSeverity('success')
                setAlertMensaje(`Se ELIMINO correctamente`)
                setAlert(true)
                
            })
            .then(()=>{
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                setActualizarDatos(!actualizarDatos)
            })
            .catch((err)=>{
                console.error(err)
                setSeverity('error')
                setAlertMensaje(`No se pudo ELIMINAR intente mas tarde `)
                setAlert(true)
                setActualizarDatos(!actualizarDatos)
            })


            
        }
        
       
        const handleOnSubmit = (e) => {
            e.preventDefault();
            setIsLoading(true)
            


            const formData  = new FormData(formRef.current)
            formData.append('id', uuidv4())
            formData.append('idUser' , uidUser)
            
            
            typeformulario === 'video' && formData.append('categoria', categoriaList)
            
            const datos = Object.fromEntries(formData.entries())
            
            if(uid){
                upDate(typeformulario, uid, datos)
                .then((res)=>{
                    setSeverity('success')
                    setAlertMensaje(`Se actualizo correctamente`)
                    setAlert(true)
                })
                .then(()=>{
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                    setActualizarDatos(!actualizarDatos)

                })
                .catch((err)=>{
                    console.error(err)
                    setSeverity('error')
                    setAlertMensaje(`No se pudo guardar intente mas tarde`)
                    setAlert(true)
                    setActualizarDatos(!actualizarDatos)

                })
                
            }else{
                
                createData(datos,typeformulario)
                .then((rep)=>{
                    setSeverity('success')
                    setAlertMensaje(`Se CREO correctamente`)
                    setAlert(true)

                })
                .then(()=>{
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                    setActualizarDatos(!actualizarDatos)

                })
                .catch((err)=>{
                    console.error(err)
                    setSeverity('error')
                    setAlertMensaje(`No se pudo guardar intente mas tarde`)
                    setAlert(true)
                    setActualizarDatos(!actualizarDatos)
                })
              
            }
        }

        if(isLoading){
            return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', opacity: 0.3}}>
            <CircularProgress />
        </Box>
        }

    const data = {

        getDataEdit,
        upDate,
        deleteData,
        createData,
        documentsCategoria,
        documentsVideos,
        setIdHEro,
        idHero,
        setformulario,
        setTypeFormulario,
        formulario,
        typeformulario,
        handledFormulario,
        getData,
        datos,
        handledDelete,
        handleOnSubmit,
        formRef,
        setAlert,
        severity,
        alertMensaje,
        alert,
        categoriaList,
        setCategoriaList,
        setUid,
        isLoading,
        headerRef,
        setIsLoading,
    }

    return (

        <FirebaseContext.Provider value={data}>
            {children}
        </FirebaseContext.Provider>
    );

};

export { DataProvider }