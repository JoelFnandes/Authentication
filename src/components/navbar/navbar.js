import React, { useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg"


function Navbar() {
    

    return (
        <nav className="nav-geral">
            <div className="contain-logo">
                <a className="link-logo" href="/"><img className="img-logo" src={logo}/></a>
            </div>
            <ul className="nav-list-links">
                <li className="nav-li-link"><a href="/" className="nav-link-primary">Home</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Produtos</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Contatos</a></li>
                <li className="nav-li-link"><a href="" className="nav-link-primary">Nossos Clientes</a></li>
                <li className="nav-li-link"><a href="/authen"><button className="btn-secon">Iniciar Sessão</button></a></li>
            </ul>
            
                    
            
        </nav>
    );
}
export default Navbar;