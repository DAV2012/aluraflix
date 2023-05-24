import { useContext } from "react";
import styled from "styled-components";
import Boton from "../boton";
import FirebaseContext from "../../contexts/FirebaseContext";
import Tarjeta from "../tarjeta"
import { Carousel } from "antd";


const StyledContainerCategoria = styled.div`
    overflow:hidden;
    &  p h3{
        margin: 0;
        color: #F5F5F5;
        font-weight: 300;
        font-size: 16px;
        line-height: 14px;
        margin-bottom: 1rem;
        -webkit-text-stroke: 1px  rgba(0, 0, 0, 0.5);
    }
    & .ant-carousel{
        top:0
    }
    &  p{
        color: white;
    }
    @media (min-width: 760px) {
        flex-direction:row;
        justify-content: center;
    }

`
const StyledCategoria = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:1rem;
    margin-bottom:1rem;
    padding: 0 1rem;

`
const StyledCorousel = styled(Carousel)`
        padding: 0 1rem;

    & > div {

        width:322px;
    }  
    .slick-list{
        
        overflow:visible;

    }
    @media (min-width: 1440px) {
        & > div{
            width:380px
        }
        
    }
`
const Categoria = () => {

    const {
        idHero,
        documentsCategoria,
        documentsVideos,
    } = useContext(FirebaseContext)
    
    let data = []

    return (
        documentsCategoria.length > 0 ? documentsCategoria.map(({ categoria, color, id }, index) => {
        data = documentsVideos.filter((document) => document.categoria === categoria)

            return <StyledContainerCategoria key={id}>
                {index !== 0 && <StyledCategoria>
                    <Boton botonTexto={categoria} color={color}></Boton>
                    <h2>Formación {categoria} de Alura Latam</h2>
                </StyledCategoria>}
                <StyledCorousel infinite={false} >
                    {data.length > 0  ? data.map(({ linkImagen,linkVideo, id }, index) => {
                        return (
                            id !== idHero && <Tarjeta src={linkImagen} color={color} key={id} url={linkVideo}/>)
                    }) : <p>No hay Videos</p>}
                </StyledCorousel>
            </StyledContainerCategoria>
        }) : <p>No hay categorias</p>
    );
}
export default Categoria