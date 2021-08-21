import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { getCustomerOrder } from '../../../CommonFunc/CommonFunctions';

const CustomerOrder = () => {


    const [customersOrder, setCustomerOrders] = useState([]);
    const [message, setMessage] = useState("")





    const updateOrderStatus = async order => {
        let modifiedOrder = {
            ...order,
            status: order?.status === "pending"?"done":"pending",
        }

        try{
            let res = await fetch(`https://photophiya.herokuapp.com/updateOrderStatus?id=${order?._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedOrder)
            })
            let data = await res.json();
            if(data){
                setMessage("Deleted Successfully");
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
        }catch(err){

        }

    }



    const deleteService = async id => {
        try{
            let response = await fetch("https://photophiya.herokuapp.com/deleteOrder/"+id, {method:"DELETE"});
            let data = await response.json();
            if(data){
                setMessage("Deleted Successfully");
                setTimeout(() => {
                    setMessage("")
                }, 3000);
            }
        }catch(err){

        }
    }


    useEffect(() => {
        getCustomerOrder("admin", setCustomerOrders);
    }, [message])

    return (
        <div style={{padding: "0px 30px"}}>
            {message && <p style={{color:"green", fontSize:"11px"}}>{message}</p>}
        <table className="table">
            <caption>All Orders</caption>
            
            <thead>
            <tr>
                <th scope="col">Image Title</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Status</th>
                <th scope="col">Nmae</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {
                customersOrder.map(item => (
                    <tr key={shortid.generate()}>
                        <td style={{wordWrap:"break-word"}} data-label="Account">{item?.title}</td>
                        <td style={{wordWrap:"break-word"}} data-label="Due Date">{item?.price+" tk"}</td>
                        <td style={{wordWrap:"break-word"}} data-label="Amount"><img style={{height:"30px", width:"30px"}} src={item?.img} alt="img" /></td>
                        <td style={{wordWrap:"break-word"}} data-label="Due Date">
                            <input onChange={() => updateOrderStatus(item)} checked={item?.status==="done"?true:false} type="checkbox"/>{item?.status}
                        </td>
                        <td style={{wordWrap:"break-word"}} data-label="Account">{item?.author?.name}</td>
                        <td style={{wordWrap:"break-word"}} data-label="Account">{item?.author?.email}</td>
                        <td style={{wordWrap:"break-word"}} data-label="Account">{item?.author?.number}</td>
                        <td style={{wordWrap:"break-word"}} data-label="Account">{item?.author?.address}</td>
                        <td style={{wordWrap:"break-word"}} data-label="Period"><button onClick={() => deleteService(item?._id)} style={{backgroundColor:"#FCF6F5", cursor:"pointer"}}>Delete</button></td>
                    </tr>
                ))
            }

            </tbody>
        </table> 
    </div>   
    )
}

export default CustomerOrder;
