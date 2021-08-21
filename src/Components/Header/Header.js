import React, { useContext, useState } from 'react';
import './Header.css';
import Logo from '../../images/logo.png';
import Menu from '../../images/menu.png';
import CloseMenu from '../../images/close.png';
import { motion } from 'framer-motion';
import {
    Link
  } from "react-router-dom";
import { GlobalState } from '../../Context/Context';

const Header = () => {
    const { LoginUserData } = useContext(GlobalState);
    const [isCloseMenu, setCloseMenu] = useState("");
    const [isMenu, setMenu] = useState('d-none');
    const [isLoggedIn, setIsLoggedIn] = LoginUserData;

    const toggle = (label) => {
        if(label === "menu"){
            setCloseMenu("d-block");
            setMenu("d-block");
        }else if(label === "closeMenu"){
            setCloseMenu("d-none");
            setMenu("d-none")
        }
    }

   

    window.addEventListener("resize", () => {
        if(window.innerWidth > 768){
            setCloseMenu("");
            setMenu("d-none")
        }
    })

   

    return (
        <div className="header-wrapper">
            <div className="logo-wrapper">
                <img src={Logo} alt="Logo" />
            </div>

            <div style={{display: "flex", justifyContent:"center"}}>
            {
                isMenu === "d-none" && <img onClick={() => toggle("menu")} className={`menu-btn`} src={Menu} alt="Menu" />
            }
            
            {
                isCloseMenu ==="d-block" && <img onClick={() => toggle("closeMenu")} className={`c-menu-btn`} src={CloseMenu} alt="CloseMenu" />
            }
            </div>
            

            <ul className="navbar">
                <li><Link className="link-style" to="/">HOME</Link></li>
                <li><Link className="link-style" to="/galary">GALARY</Link></li>
                <li><Link className="link-style" to="/pricing">PRICING</Link></li>
                <li>BLOG</li>
                <li>ABOUT ME</li>
                <li>CONTACT</li>
                {
                    isLoggedIn?.role === "admin" && <li><Link className="link-style" to="/admin">ADMIN</Link></li>
                }
                {
                    isLoggedIn?.role !== "admin" && isLoggedIn?.role && <li><Link className="link-style" to="/checkout">CHECKOUT</Link></li>
                }
            </ul>
            
            {
                isCloseMenu ==="d-block" && <motion.ul 
                initial="hidden"
                animate="visible"
                variants={ {
                    visible: { opacity: 1, y:0 , transition:{duration: .3}},
                    hidden: { opacity: 0 , y: -50, transition:{duration: 0}},
                }}
             className="navbar-mobile">
                <li><Link className="link-style" to="/">HOME</Link></li>
                <li><Link className="link-style" to="/galary">GALARY</Link></li>
                <li><Link className="link-style" to="/pricing">PRICING</Link></li>
                <li>BLOG</li>
                <li>ABOUT ME</li>
                <li>CONTACT</li>
                {
                    isLoggedIn?.role ==="admin" && <li><Link className="link-style" to="/admin">ADMIN</Link></li>
                }
                {
                    isLoggedIn?.role !== "admin" && <li><Link className="link-style" to="/checkout">CHECKOUT</Link></li>
                }
            </motion.ul>
            }
        </div>
    )
}

export default Header;
