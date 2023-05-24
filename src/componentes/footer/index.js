import React from "react";
import styled from "styled-components"

const StyledFooter = styled.footer`
    box-sizing: border-box;
    height: 40px;
    padding: 7px;
    text-align: center;
    border-top: 2px solid #2A7AE4;
    margin-top: 1rem;
    & > img{
        height: 1.5625rem;
        vertical-align: middle;
    }
`

function Footer (props){
    return(
    <StyledFooter>
        <img src='/img/logo.png'  alt='aluraflix'/>
    </StyledFooter>
    );
}

export default Footer