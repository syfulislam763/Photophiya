import React, { useContext, useEffect, useState } from 'react';
import "./Checkout.css";
import { useLocation } from 'react-router-dom';
import { GlobalState } from '../../Context/Context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCustomerOrder, placeOrder } from '../../CommonFunc/CommonFunctions';
import Table from './Table';

const Checkout = () => {

    const { CustomerOrder, LoginUserData } = useContext(GlobalState);
    const [order, setOrder] = CustomerOrder;
    const [isLoggedIn, setIsLoggedIn] = LoginUserData;
    const [isOrderPlased, setIsOrderPlased] = useState("");

    const [submittedOrders, setSubmittedOrders] = useState([]);


    const schema = Yup.object().shape({
        name: Yup.string().required("Name Required"),
        email: Yup.string().email("Email not valid").required("Email Required"),
        address: Yup.string().required("Address Required"),
        number: Yup.string().required("Number Required")
    })
    const initValues = {
        name: "",
        email: "",
        address:"",
        number: ""
    }

    const formik = useFormik({
        validationSchema:schema,
        initialValues: initValues,
        onSubmit: (values, actions) => {
            if(isLoggedIn?.email){
                let payload = {
                    author: values,
                    ...order,
                    email: isLoggedIn?.email,
                    status: "pending",
                }
                placeOrder(payload, setIsOrderPlased, () => {
                    setOrder({})
                    actions.resetForm();
                })

                
            }
           
        }
    })

    useEffect(() => {
        getCustomerOrder("user", setSubmittedOrders, isLoggedIn?.email)
    }, [isOrderPlased])

    return (
        <div className="checkout-wrapper">
            <h3 className="checkout-h">Order in process</h3>
            <hr/>
                <div>
                    <Table items={[order]} caption="Product"/>
                </div>
                <div className="login-wrapper c-m">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label><strong>Name</strong></label><br/>
                            <input value={formik?.values?.name}  onChange={formik.handleChange} name="name" className="input" placeholder="Name" type="text"/>
                            {formik?.errors?.name && <p className="error-style">{formik?.errors?.name}</p>}
                        </div>
                        <div>
                            <label><strong>E-Mail</strong></label><br/>
                            <input value={formik?.values?.email}  onChange={formik.handleChange} name="email" className="input" placeholder="example@gmail.com" type="email"/>
                            {formik?.errors?.email && <p className="error-style">{formik?.errors?.email}</p>}
                        </div>
                        <div>
                            <label><strong>Address</strong></label><br/>
                            <textarea value={formik?.values?.address}  onChange={formik.handleChange} name="address"  className="input" type="textarea"/>
                            {formik?.errors?.address && <p className="error-style">{formik?.errors?.address}</p>}
                        </div>
                        <div>
                            <label><strong>Number</strong></label><br/>
                            <input value={formik?.values?.number} onChange={formik.handleChange} name="number" className="input" placeholder="number" type="text"/>
                            {formik?.errors?.number && <p className="error-style">{formik?.errors?.number}</p>}

                        </div>
                        <div>
                            <button type="submit">Sumbit Order</button>
                        </div>
                        {
                            isOrderPlased && <p style={{color:"green", fontSize:"11px"}}>{isOrderPlased}</p>
                        }
                    </form>
                </div>

            <h3 className="checkout-h">Submited order</h3>
            <hr/>
            <div>
                <Table items={submittedOrders}/>
            </div>
        </div>
    )
}

export default Checkout;
