import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import  styled  from "styled-components";
import ReactPlayer from "react-player";

const StyleBox = styled(Box) `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 24px;
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    ::selection{
        border:none
    }
    & i{
        font-size:40px;
        margin:3rem 0 0;
    }
`;

const StyledReactPlayer =styled(ReactPlayer)`
  max-width: 100%;
  box-sizing: border-box;
  height: 100%;
  object-fit: contain;

`


export default function NestedModal({handleClose,open, url}) {

    const handleIconClick = () => {
        handleClose();
    };
    return (
        <div>
            <Modal
                open = {open}
                onClose={handleClose}
            >
                <StyleBox>
                    <StyledReactPlayer
                        url={url}
                        controls
                    >
                    </StyledReactPlayer>
                    <i className="fa-solid fa-circle-xmark" onClick={handleIconClick}></i>
                </StyleBox>
            </Modal>
        </div>
    );
}