import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Boton from "../boton";
import FirebaseContext from "../../contexts/FirebaseContext";
import NestedModal from "../Modal/modal";

const TitleMobile = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    align-items: center;
    margin-bottom: 5rem;
    & h2{
        -webkit-text-stroke: 4px  rgba(0, 0, 0, 0.2);
        font-weight: 300;
        font-size: 27px;
        line-height: 32px;
        display: flex;
        text-align:center;
    }
    @media (min-width: 1440px) {
        display:none;
    }
`

const StyledHero = styled.section`
    width:100%;
    gap:1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content:center;
    background:  linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #171717 110%) , linear-gradient(180deg, rgba(0, 0, 0, 0) 56%, #171717 100%), url(https://firebasestorage.googleapis.com/v0/b/aluraflix-2ff86.appspot.com/o/hero.webp?alt=media&token=76d416a9-c356-4db6-8bd1-1aa3c8a10058);   
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 5rem 1rem 0 1rem;

    @media (min-width: 1440px) {
        flex-direction:row;
        align-items:flex-start;
        justify-content:space-between;
        padding: 20rem 2rem 3rem 2rem;
        gap:2rem;
    }

`
const Styledcategoria = styled.div`
    & h3{
        margin-top:1rem;
    }
    & > h2,P{
        display:none;
    };


    @media (min-width: 1080px) {
        display:flex;
        align-items:flex-start;
        flex-direction:column;
        gap:1rem;
        & h2{font-weight: 600;
            font-size: 2rem;
            line-height: 60px
        };
        & p{
            font-weight: 300;
            font-size: 18px;
            line-height: 21px;
            display:block;
        }
        & h3{
            display:none;
        }

    }
`

const StyledTarjeta = styled.img`
    display:none;
    @media (min-width: 1080px) {
        display:block;
        height :auto;
        width:  50%;
        border: 5px solid ${(props) => props.color};
        
    }
`
const Hero = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };

    const {
        setIdHEro,
        documentsCategoria,
        documentsVideos,

    } = useContext(FirebaseContext)

    const { categoria } = documentsCategoria.length > 0 ? documentsCategoria[0] : {};
    const data = documentsVideos.filter((document) => document.categoria === categoria)
    useEffect(() => {
        if(data.length>0 && data!==null){
            setIdHEro(data[0].id)
        }

    }, [data,open, setIdHEro])

    return (
        <StyledHero>
            {
                data.length > 0 && <>
                    <TitleMobile>
                        <h2>{data[0].titulo}</h2>
                        <Boton botonTexto={'ver'} onClick={handleOpen} type='button' color="#9E9E9E"  weight='300' />
                    </TitleMobile>
                    <Styledcategoria>
                        <Boton botonTexto={data[0].categoria} color={documentsCategoria[0].color}></Boton>
                        <h2>{data[0].titulo}</h2>
                        <p>{data[0].descripcion}</p>
                        <h3>Formación {data[0].categoria} de Alura Latam</h3>
                    </Styledcategoria>
                    <>
                        <StyledTarjeta onClick={handleOpen}
                            src={data[0].linkImagen}

                            color={documentsCategoria[0].color}
                        />
                        <NestedModal
                            open={open}
                            handleClose={handleClose}
                            url={data[0].linkVideo}
                        />
                    </>
                </>
            }
        </StyledHero>
    );
}


export default Hero