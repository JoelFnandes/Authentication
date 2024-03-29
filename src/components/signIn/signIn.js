import React, { useState, useEffect } from "react";
import "./signIn.css";
// import logo from '../../images/logo.svg'
import undraw from '../../images/undraw_authentication.png'
import envelope from '../../icons/envelope-solid.svg'
import SignUp from "../signUp/signUp";
import Navbar from "../navbar/navbar";
import Axios from "axios";
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import  {AuthContext} from '../authContext';


function SignIn() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [nameReg, setNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [password2Reg, setPassword2Reg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { setIsAuthenticated, setUser } = useContext(AuthContext);

    Axios.defaults.withCredentials = true;

    const [msgError, setMsgError] = useState();
    const [msgSucc, setMsgSucc] = useState();
    let r;
    const register = () => {
        Axios.post("http://localhost:4000/register", {
            name: nameReg,
            email: emailReg,
            password: passwordReg,
            password2: password2Reg,

        }).then((response) => {
            if (response.data.errors == null) {
                setMsgSucc(response.data);
                setModalVisible(false);
                
            }
            else {
                setMsgError(response.data);
            }
        });

    }
    
    const signIn = () => {
        Axios.post("http://localhost:4000/signIn", {
            email: email,
            password: password,
        }).then((response,isMatch) =>{
            if(response.data.errors == null){ 
                setIsAuthenticated(true);
                setUser({id: response.data.successes[0].message, name: response.data.successes[1].message });
                history.push('/home');
            } else {
                setMsgError(response.data);
            }

        })     
    }
    

    return (
        <div className="div-geral">
            {/* <div className="div-logo">
                <img src={logo} alt="lorem" />
            </div> */}
            <div className="div-align">
                <div className="div-align-items">
                    <ul><li>{msgSucc !== undefined ? msgSucc.successes.map(success => <p id="success">{success.message}</p>): null}</li></ul>
                    <ul><li>{msgError !== undefined ? msgError.errors.map((error, index) => ( <p id="error" key={index}>{error.message}</p>)) : null}</li></ul>
                    <h2>Faça login</h2>
                    <div className="div-input">
                        <span src={envelope}></span>
                        <input className="input-text" type="text" onChange={(e) => { setEmail(e.target.value); }} placeholder="Email" />
                    </div>
                    <div className="div-input">
                        <input className="input-text" type="password" onChange={(e) => { setPassword(e.target.value); }} placeholder="Senha" />
                    </div>
                    <div className="div-input">
                        <div className="div-sign">
                            <button className="btn-prima" onClick={signIn} type="submit">Entrar</button>
                            <p className="div-text">ou</p>
                            <a onClick={() => setModalVisible(true)} className="btn-text-sign">Inscreva-se</a>
                        </div>
                    </div>
                </div>
                <div className="div-draw">
                    <img className="draw" src={undraw} alt="authentication" />
                </div>
            </div>
            {isModalVisible ? (
                <SignUp onClose={() => setModalVisible()}>
                    <div className="div-align-items-modal">
                        <ul><li>{msgError !== undefined ? msgError.errors.map(error => <p>{error.message}</p>) : null}</li>
                        </ul>
                        <h2>Inscreva-se</h2>
                        <div className="div-input">
                            <input id="nameReg" className="input-text" onChange={(e) => { setNameReg(e.target.value); }} type="text" placeholder="Nome" required />
                        </div>
                        <div className="div-input">
                            <input id="emailReg" className="input-text" onChange={(e) => { setEmailReg(e.target.value); }} type="email" placeholder="Email" required />
                        </div>
                        <div className="div-input">
                            <input id="passwordReg" className="input-text" onChange={(e) => { setPasswordReg(e.target.value); }} type="password" placeholder="Senha" required />
                        </div>
                        <div className="div-input">
                            <input id="password2Reg" className="input-text" onChange={(e) => { setPassword2Reg(e.target.value); }} type="password" placeholder="Confirme sua senha" required />
                        </div>
                        <div className="div-input">
                            <div className="div-sign">
                                <button className="btn-prima" onClick={register} type="submit">Criar</button>
                            </div>
                        </div>
                    </div>
                </SignUp>
            ) : null}
        </div>
    )
};
export default SignIn;
