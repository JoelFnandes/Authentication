import React from 'react';
import { Navbar } from '..';
import "./HomeMain.css";
import ilutracao from "../../images/Ilustracao.png"

function HomeMain(){ 
        return (
            <div className="">
                <Navbar/>
            <div className="div-home">
                <div className="div-elemen">
                    <h1>Dê Mais Versatilidade Aos Projetos Que Você Ama</h1>
                    <button className="btn-prima">Saiba mais</button>
                </div>
                <div className="div_figu"><img className="ilustra" src={ilutracao}/></div>
            </div>
            </div>
        )
};
export default HomeMain;

