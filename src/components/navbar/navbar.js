import React, { Component, useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import { Button } from "../button/button";
import menu from "../../icons/bars-solid.svg"
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {

    const [isdropOpen, setDropOpen] = useState(true);
    const [isdropClose, setDropClose] = useState(false);

    return (
        <nav className="nav-geral">
            <a className="link-logo" href="/"><img className="img-logo" src={logo} /></a>
            <ul className={isdropClose ? 'nav-ul-links active' : 'nav-ul-links'}>
                <li className="nav-li-link"><a href="/" className="nav-link-primary">Home</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Produtos</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Contatos</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Nossos Clientes</a></li>
                <li className="nav-li-link"><a href="/authen"><Button buttonStyle="btn-outline" buttonSize="btn-medium" onClick="">Iniciar Sessão</Button></a></li>
            </ul>
            <div className="menu-icon">
                {isdropOpen ? (
                    <FaBars className="faBars" onClick={() => setDropOpen(false, setDropClose(true))}></FaBars>
                ) : null}
                {isdropClose ? (
                    <FaTimes className="faBars" onClick={() => setDropOpen(true, setDropClose(false))}></FaTimes>)
                : null}
            </div>
        </nav>
    );
}
export default Navbar;