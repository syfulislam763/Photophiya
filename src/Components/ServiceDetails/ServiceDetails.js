import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../Context/Context';
import "./ServiceDetails.css";

const ServiceDetails = () => {
    const { query } = useLocation();
    const {CustomerOrder}  = useContext(GlobalState);
    const [order, setOrder] = CustomerOrder;
    return (
        <div className="details-wrapper">
           <div>
           <div>
                <img className="d-img" src={query?.img} alt="img"/>

                <div className="title-wrapper">
                    <p>{query?.title}</p>
                    <p>{query?.price} tk</p>
                </div>
                <div>
                    <p style={{color:"gray"}}>{query?.description}</p>
                </div>
            </div>
            <div>
                 <Link onClick={() => setOrder(query)} to={{pathname: `/checkout`, query:query}}>
                    <button className="button">Buy Now</button>
                </Link>
            </div>
           </div>

        </div>
    )
}

export default ServiceDetails;

