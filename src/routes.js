import React from 'react';
import { Component, useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";

import { HomeMain, Authentication, ChatPage, } from './pages';
import { SignIn, Navbar, Chat } from './components'

import { AuthProvider } from './components/authContext';



const Routes = () => {

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/authen">
                        <Authentication></Authentication>
                    </Route>
                    
                    <Route path="/home">
                        <Navbar/>
                        <HomeMain></HomeMain>
                    </Route>
                    <Route path="/chat">
                    <Navbar/>
                        <ChatPage></ChatPage>
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    );
}
export default Routes;