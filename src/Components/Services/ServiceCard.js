import React, { useContext, useState } from 'react';
import "./Services.css";
import {Link} from 'react-router-dom';
import { GlobalState } from '../../Context/Context';

const ServiceCard = ({item, i}) => {

    const { CustomerOrder }  = useContext(GlobalState);

    const [order, setOrder] = CustomerOrder;

    return (
        <div style={{
            backgroundImage:`url(${item?.img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }} className="">
            {/* <div style={{height:"100%"}}>

            </div> */}
            <div  className="button-wrapper">
                <Link  to={{pathname:`/galary/servicedetails/${i}`, query:item}}>
                    <button  className="button">View</button>
                </Link>
                <Link onClick={() => setOrder(item)} to={{pathname: `/checkout`, query: item}}>
                    <button className="button">Buy Now</button>
                </Link>
            </div>
        </div>
    )
}

export default ServiceCard;
