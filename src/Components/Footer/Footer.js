import React from 'react';
import "./Footer.css";
import i1 from '../../images/f.png';
import i2 from '../../images/t.png';
import i3 from '../../images/i.png';
import i4 from '../../images/fi.png';
import i5 from '../../images/i5.png';
import i6 from '../../images/i6.png';

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div>
                <img className="icon" src={i1} alt="alt"/>
                <img className="icon" src={i2} alt="alt"/>
                <img className="icon" src={i3} alt="alt"/>
                <img className="icon" src={i4} alt="alt"/>
                <img className="icon" src={i5} alt="alt"/>
                <img className="icon" src={i6} alt="alt"/>
            </div>
            <p>Copyright © 2021 Bob Smith</p>
        </div>
    )
}

export default Footer;
