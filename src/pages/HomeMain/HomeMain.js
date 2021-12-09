import React from 'react';
import { Navbar } from '..';
import "./HomeMain.css";
import ilutracao from "../../images/Ilustracao.png"
import { Button } from '../../components/button/button';


function HomeMain() {
    return (
        <div className="">
            <Navbar />
            <div className="div-home">
                <div className="first-contain">
                    <div className="div-elemen">
                        <h1>Dê Mais Versatilidade Aos Projetos Que Você Ama</h1>
                        <Button buttonStyle="btn-primary" buttonSize="btn-medium">Saiba mais</Button>
                    </div>
                    <div className="div_figu"><img className="ilustra" src={ilutracao} /></div>
                </div>
            </div>
        </div>
    )
};
export default HomeMain;

