import React, { useContext, useState } from 'react';
import "./Login.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {GlobalState} from '../../Context/Context';
import { createUser, getLogin } from '../../CommonFunc/CommonFunctions';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const { LoginUserData } = useContext(GlobalState);
    const [isAccount, setIsAccount] = useState(true);
    const [isCreatedUser, setIsCreatedUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = LoginUserData;
    const history = useHistory();

    const schema = Yup.object().shape({
        password: Yup.string()
                .required('No password provided.') 
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    })
    const initValues = {
        role: "user",
        email: "",
        password: "",
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema:schema,
        onSubmit: async (values, actions) => {
            if(isAccount){
                getLogin(values?.password, values?.email, setIsLoggedIn, (user) => {
                    if(user?.role === "admin")history.push("/");
                    else history.push("/checkout")
                })
            }else{
                createUser(values, setIsCreatedUser, user => {
                    setIsLoggedIn(user);
                    history.push("/checkout");
                })
            }
        }
    })

    

    // console.log(formik?.values)

    return (
        <div className="login-wrapper">
            <div className="login-user">
                <div style={{width:"100%"}}>
                    <label><strong>E-Mail</strong></label><br/>
                    <input onChange={formik?.handleChange} name="email" placeholder="example@gmail.com" className="input" type="email"/>
                    {formik?.errors?.email && <p className="error-style">{formik?.errors?.email}</p>}
                </div>
                <div style={{width:"100%"}}>
                    <label><strong>Password</strong></label><br/>
                    <input onChange={formik?.handleChange} name="password" placeholder="******" className="input" type="password"/>
                    {formik?.errors?.password && <p className="error-style">{formik?.errors?.password}</p>}
                </div>
                <div style={{width:"100%"}}>
                    {
                        isAccount?<button type="button" onClick={formik?.handleSubmit} className="login-btn">Login</button>
                        :<button onClick={formik?.handleSubmit} className="login-btn">Create Account</button>
                    }
                </div>
                {isLoggedIn?.message && <p className="error-style">{isLoggedIn?.message}</p>}
                <p onClick={() => setIsAccount(st => !st)} style={{cursor:"pointer"}}>{isAccount?"Don't have account?": "Already have account?"}</p>
            </div>
        </div>
    )
}

export default Login;
