import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Home from '../Home/Home';
import './Root.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Services from '../Services/Services';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import { GlobalState } from '../../Context/Context';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Login from '../Login/Login';
import Checkout from '../Checkout/Checkout';
import Admin from '../Admin/Admin';
import LoginLink from './LoginLink';

const Root = () => {

    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [order, setOrder] = useState({});

    

    return (
        <GlobalState.Provider value={{
            LoginUserData: [isLoggedIn, setIsLoggedIn],
            CustomerOrder: [order, setOrder]
        }}>
            
            <Router>
            
            <Switch>
                <Route exact path="/galary">
                <div className="container">
                    <div className="auth-btn">
                        <LoginLink/>
                    </div>
                    <Header/>
                    <Services/>
                    <Footer/>
                </div>
                </Route>
                <Route exact path="/galary/servicedetails/:id">
                <div className="container">
                    <div className="auth-btn">
                        <LoginLink/>
                    </div>
                    <Header/>
                    <ServiceDetails/>
                    <Footer/>
                </div>
                </Route>

                <PrivateRoute path="/admin">
                    <Admin/>
                </PrivateRoute>

                <PrivateRoute path="/checkout">
                <div className="container">
                    <div className="auth-btn">
                        <LoginLink/>
                    </div>
                    <Header/>
                    <Checkout/>
                    <Footer/>
                </div>
                </PrivateRoute>

                <Route exact path="/login">
                <div className="container">
                    <div className="auth-btn">
                        <LoginLink/>
                    </div>
                    <Header/>
                    <Login/>
                    <Footer/>
                </div>
                </Route>

                <Route exact path="/">
                <div className="container">
                    <div className="auth-btn">
                        <LoginLink/>
                    </div>
                    <Header/>
                    <Home/>
                    <Footer/>
                </div>
                </Route>
                <Route path="*">
                <div className="container">
                    <div className="auth-btn">
                        <LoginLink/>
                    </div>
                    <Header/>
                    <div style={{
                        textAlign:"center",
                        marginTop: "100px"
                    }}>
                        <h3>NOt FoUnd</h3>
                    </div>
                </div>
                </Route>
                
            </Switch>
            
            </Router>
        </GlobalState.Provider>
    )
}

export default Root;
