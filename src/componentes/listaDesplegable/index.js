import { Select, MenuItem , } from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";

function ListaDesplegable (){
    const {
        categoriaList,
        documentsCategoria,
        setCategoriaList
    } = useContext(FirebaseContext)

    const handleChange = (event) => {
        console.log(event.target.value)
        setCategoriaList(event.target.value);
    };

    const List = styled(Select)`
         width:100%;
        position: relative;
        background: #53585D;
        border-radius: 4px;
        margin-bottom: 2rem;
        height: 50px;
        color:#FFFFFF;
    `

    const StyledMenuItem = styled(MenuItem)`   
        color: ${({ selected }) => (selected ? "#FFFFFF" : "inherit")};
    `;
    return (   
        <List
            value={categoriaList}
            onChange={handleChange}
            id="demo-simple-select-label"
        >
            {
                documentsCategoria.map(({ categoria, id }) => {
                    return <StyledMenuItem value={categoria} key={id}>{categoria}</StyledMenuItem>
                })
            }
        </List>
   

    );
  }

export default ListaDesplegable