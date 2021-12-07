import React, { useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg"
import { useLocation } from 'react-router-dom';

function Navbar() {
    const [isButtonVisible, setButtonVisible] = useState(true);
    const pathname = window.location.pathname;
    return (
        <nav className="nav-geral">
            <div className="contain-logo">
                <a className="link-logo" href="/"><img className="nav-logo" src={logo}/></a>
            </div>
            <ul className="list-links">
                <li className="ponto-link"><a href="/" className="nav-link-primary">Home</a></li>
                <li className="ponto-link"><a href="" className="nav-link-primary">Produtos</a></li>
                <li className="ponto-link"><a href="" className="nav-link-primary">Contatos</a></li>
                <li className="ponto-link"><a href="" className="nav-link-primary">Nossos Clientes</a></li>
                {isButtonVisible ?(
                <div className="div-sign-button" >
                    <li><a href="/authen"><button className="btn-secon" >Iniciar Sessão</button></a></li>
                </div>
                ):null}
            </ul>
        </nav>
    );
}
export default Navbar;