import React, { useContext } from 'react';
import { GlobalState } from '../../Context/Context';
import { Link, useHistory } from 'react-router-dom';

const LoginLink = () => {
    const { LoginUserData }  = useContext(GlobalState);
    const [isLoggedIn, setIsLoggedIn] = LoginUserData;
    const history = useHistory();
    return (
        <>
            {
                !isLoggedIn?.email?
                <Link style={{textDecoration:"none", color:"gray"}} to="/login"><h4>Login</h4></Link>
                :<h4 style={{textDecoration:"none", color:"gray", cursor:'pointer'}} onClick={() => setIsLoggedIn({})}>Logout</h4>
            }
        </>
    )
}

export default LoginLink;
