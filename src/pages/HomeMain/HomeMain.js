import React from 'react';
import { Navbar } from '..';
import "./HomeMain.css";
import ilustracao from "../../images/Ilustracao-new.png"
import { Button } from '../../components/button/button';


function HomeMain() {
    return (

        <div className="div-home">
            <div className="first-contain">
                <div className="div-elemen">
                    <h1>Dê Mais Versatilidade Aos Projetos Que Você Ama</h1>
                    <Button buttonStyle="btn-primary" buttonSize="btn-medium">Saiba mais</Button>
                </div>
                <div className="div_figu"><img className="ilustra" src={ilustracao} /></div>
            </div>
        </div>
    )
};
export default HomeMain;

