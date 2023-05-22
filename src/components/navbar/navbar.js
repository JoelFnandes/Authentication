import React, { Component, useState, useEffect} from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import { Button } from "../button/button";

import { FaBars, FaTimes } from 'react-icons/fa';
import Axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import  {AuthContext} from '../authContext';



const Navbar = () => {
    
    const [isdropOpen, setDropOpen] = useState(false);
    const history = useHistory();
    const { isAuthenticated, user } = useContext(AuthContext);
    
    return (
        <nav className="nav-geral">
            <Link className="link-logo"  to="/home"><img className="img-logo" src={logo} /></Link>
            <ul className={isdropOpen ? 'nav-ul-links active' : 'nav-ul-links'}>
                <li className="nav-li-link"><Link to="/home" className="nav-link-primary">Home</Link></li>
                {/* <li className="nav-li-link"><a href="/home" className="nav-link-primary">Contatos</a></li>
                <li className="nav-li-link"><a href="/home" className="nav-link-primary">Nossos Clientes</a></li> */}
                {isAuthenticated?
                <li className="nav-li-link"><Link className="nav-link-primary" to="/chat">Chat</Link></li>
                :null}
                {isAuthenticated?(  
                <li className="nav-li-link">Olá, <Link to="/authen">{user.name}</Link></li> 
                ): <li className="nav-li-link"><Link to="/authen"><Button buttonStyle="btn-outline" buttonSize="btn-medium" onClick="">Iniciar Sessão</Button></Link></li>}
            </ul>
            <div className="menu-icon">
                {!isdropOpen ? 
                <FaBars className="faBars" onClick={() => setDropOpen(!isdropOpen)}></FaBars> : 
                <FaTimes className="faBars" onClick={() => setDropOpen(!isdropOpen)}></FaTimes>
                }
                {/* {isdropOpen == false? (
                    <FaBars className="faBars" onClick={() => setDropOpen(true)}></FaBars>
                ) : null}
                {isdropOpen ? (
                    <FaTimes className="faBars" onClick={() => setDropOpen(false)}></FaTimes>)
                : null} */}
            </div>
        </nav>
    );
}
export default Navbar;