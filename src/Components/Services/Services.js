import React, { useEffect, useState } from 'react';
import "./Services.css";
import shortid from 'shortid';
import ServiceCard from './ServiceCard';
import { getAllServices } from '../../CommonFunc/CommonFunctions';

const Services = () => {
    

    const [services, setServices] = useState([]);

    useEffect(() => {
        getAllServices(setServices)
    }, [])
    
    return (
        <div className="service-card-container">
            {
                services?.map((item, i) => <ServiceCard i={item?._id} item={item} key={shortid.generate()}/>)
            }
        </div>
    )
}

export default Services;
