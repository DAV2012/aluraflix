import React, { useContext } from "react"
import styled from "styled-components";
import FirebaseContext from "../../contexts/FirebaseContext";

const StyledHeader = styled.header`
    box-sizing:border-box;
    display:flex;
    justify-content:space-between;
    align-items:center;
    height: 40px;
    padding: 7px;
    text-align: center;  
    border-bottom:2px solid blue;
    &  img{
        height: 1.5625rem;
        vertical-align: middle;
    }& button {
        background-color:transparent;
        border:2px solid #F5F5F5;
        width: 180.12px;
        height: 40px;
        color:#F5F5F5;
        visibility:hidden;   
    }
    @media (min-width:760px){
        text-align: left;
        padding : 2.5rem 2rem;
        justify-content:space-between;
        align-items:center;
        & button {
            visibility:visible
        }  
    } 
`
const Header = ()=>{
    const {
        handledFormulario,
        headerRef,
      } = useContext(FirebaseContext) 

    return(
        <StyledHeader id='headder' ref={headerRef}>
                <img src='/img/logo.png'  alt='aluraflix' onClick={()=>handledFormulario('')} />
        </StyledHeader>
    );
}

export default Header