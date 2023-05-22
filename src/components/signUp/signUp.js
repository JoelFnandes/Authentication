import React from "react";

import './signUp.css';
import Close from "../../icons/times-solid.svg";


const SignUp = ({id="modal",onClose,children}) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) {onClose()};
    }
    
    return (
        <div id="modal" className="div-modal" onClick={handleOutsideClick}>
            <div className="contain-modal">    
                <button className="btn-close-modal" onClick={onClose} alt="close">
                    <img className="close-icon" src={Close} />
                </button>             
                <div className="content">{children}</div>
                 
            </div>
        </div>
    )
}

export default SignUp;