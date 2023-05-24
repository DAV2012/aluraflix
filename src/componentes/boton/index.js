import React from "react"
import styled from "styled-components"

export const StyledButton = styled.button`
  box-sizing: border-box;
  font-size: 21px;
  font-weight: 600;
  border: none;
  background-color: #2A7AE4;
  padding: 0.5rem 1.5rem;
  color: #F5F5F5;
  border-radius: 4px;
  margin: 1.5rem 0 0 0;
  background-color : ${({ color }) => color} ;
  color:${({ titulocolor }) => titulocolor};
  font-size:${({ titulosize }) => titulosize};
  font-Weight : ${({ weight }) => weight};
  display : ${({ hidden }) => hidden}; 
`

export default function Boton({ color, textColor, textSize, weight, botonTexto, type, onClick, hidden }) {

  return (
  <StyledButton
    type={type}
    color={color}
    titulocolor={textColor}
    titulosize={textSize}
    weight={weight}
    hidden={hidden}
    onClick={onClick}
  >
    {botonTexto}
  </StyledButton>)
}
