
import { useContext } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
import styled from "styled-components";

const Styledtabla = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  margin: 3rem 0;
  & table {
    box-sizing: border-box;
    border: 4px solid blue ;
    text-align: left;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }
  & th{
    font-weight: 400;
    font-size: 22px;
    line-height: 41px;
    border: 2px solid rgb(158, 158, 158);
    word-wrap: break-word;
    white-space: pre-wrap
  }
  & td {
    border: 2px solid rgb(158, 158, 158);
    font-weight: 300;
    font-size: 18px;
    line-height: 32px;
    word-wrap: break-word;
    white-space: pre-wrap
  }
`

const StyledCell = styled.td`

    vertical-align:middle;
    text-align:center;
    font-weight:300;
    & span{
        font-weight:100;
        cursor:pointer;
    }

`



function Tabla({ handledEdit }) {

    const {
        datos,
        handledDelete,
        typeformulario,
    } = useContext(FirebaseContext)

    

    return (
        <Styledtabla>
            <table>
                <thead>
                    <tr>
                        <th>categoria</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datos != null ? datos.map(({ id, categoria, uid, titulo }) => {
                    
                            return <tr key={id}>
                                {typeformulario === 'video'?<td>{titulo}</td>:<td>{categoria}</td>}
                                <StyledCell onClick={() => handledEdit(uid)}><span className="material-icons" id={uid}>edit</span></StyledCell>
                                <StyledCell onClick={() => handledDelete(uid)}><span className="material-icons" id={uid}>delete</span></StyledCell>
                            </tr>
                        }) : <></>
                    }
                </tbody>
            </table>
        </Styledtabla>

    );
}

export default Tabla



