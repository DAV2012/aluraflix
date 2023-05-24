import styled from "styled-components"
import NestedModal from "../Modal/modal"
import { useState } from "react";


export const StyledImg = styled.img`
    box-sizing:border-box;
    width:300px;
    margin:0;
    padding:0;
    height :172px;
    object-fit:cover;
    border: 4px solid ${({color})=> color};
    @media (min-width: 1440px) {
        width: 350px;
        height :200px;
    }
`



const Tarjeta =({url, color,src})=>{

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      
    };
    return (
        < >
            <StyledImg src={src} style={{ border:`4px solid ${color}`}} onClick={handleOpen}></StyledImg>
            <NestedModal
                    open={open}
                    handleClose={handleClose}
                    url={url}
            />
        </>
        
    )
}

export default Tarjeta