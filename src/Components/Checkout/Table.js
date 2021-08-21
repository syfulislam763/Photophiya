import React from 'react';
import shortid from 'shortid';

const Table = ({items, caption}) => {
    return (
        <table className="table">
            <caption>{caption}</caption>
            <thead>
                <tr>
                <th scope="col">Image Title</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                {
                    !caption && <th scope="col">Status</th>
                }
                </tr>
            </thead>
            <tbody>
                {
                    items && items?.map(order => (
            
                        <tr key={shortid.generate()}>
                        <td data-label="Account">{order?.title}</td>
                        <td data-label="Due Date">{order?.price && order?.price+" tk"}</td>
                    <td data-label="Amount">{order?.img && <img style={{height:"30px", width:"30px"}} src={order?.img} alt="img" />}</td>
                    {
                        !caption && <td data-label="Account">{order?.status}</td>
                    }
                    </tr>
                    
                    ))
                }
            </tbody>
    </table>
    )
}

export default Table;
