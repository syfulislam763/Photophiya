import React, { useContext } from 'react';

import { Redirect, Route } from 'react-router-dom';
import { GlobalState } from '../../Context/Context';



const PrivateRoute = ({children, path}) => {
    const { LoginUserData } = useContext(GlobalState);
    const [isLoggedIn, setIsLoggedIn] = LoginUserData;

    return <Route path={path} render={ () => (
        isLoggedIn?.email && isLoggedIn?.password ?children:<Redirect to="/login" />
    )} />
}




export default PrivateRoute;