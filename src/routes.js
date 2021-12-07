import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";

import { HomeMain, Authentication } from './pages';
import {SignIn, Navbar} from './components'

function Routes() {
    return(
        <Router>
            
            <Switch>  
                <Route path="/authen">
                    <Authentication></Authentication>
                </Route>
                <Route path="/">
                    <HomeMain></HomeMain>
                </Route>
            </Switch>
        </Router>
    );
}
export default Routes;