import React, { useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import {Button} from "../button/button";
import menu from "../../icons/bars-solid.svg"
import {FaBars} from 'react-icons/fa';

function Navbar() {
    

    return (
        <nav className="nav-geral">
            <a className="link-logo" href="/"><img className="img-logo" src={logo}/></a>
            <ul className="nav-ul-links">
                <li className="nav-li-link"><a href="/" className="nav-link-primary">Home</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Produtos</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Contatos</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Nossos Clientes</a></li>
                <li className="nav-li-link"><a href="/authen"><Button buttonStyle="btn-outline" buttonSize="btn-medium" onClick="">Iniciar Sessão</Button></a></li>
                
            </ul>
            <div className="menu-icon">
                    <FaBars className="faBars"></FaBars>
            </div>         
        </nav>
    );
}
export default Navbar;