import React, {useState} from 'react';
import './modal.css';
import closebutton from "../assets/CustomX.svg";

type IProps = {
    isOpen: boolean;
    onCloseCallback: () => void;
}

const Modal: React.FC<IProps> = ({children, isOpen = false, onCloseCallback}): JSX.Element => {
    return (
        <div className={`modal-background ${isOpen ? 'block' : 'none'}`}>
            <div className='modal-container'>
                <div className='close-button' onClick={onCloseCallback}>
                    <img src={closebutton} alt='close' className='cross' height={12} width={12}/>
                </div>
                <div className='children-container'>
                    {children}
                </div>
            </div>
        </div>
    );
}
export default Modal;