import React from 'react';
import "./DataTable.css";
import shortid from 'shortid';

const DataTable = ({services, deleteService}) => {




    

    return (
        <table className="table">
  <caption>All Services</caption>
  <thead>
    <tr>
      <th scope="col">Image Title</th>
      <th scope="col">Price</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        services && services?.map(item => (
            <tr key={shortid.generate()}>
                <td data-label="Account">{item?.title}</td>
                <td data-label="Due Date">{item?.price+" tk"}</td>
                <td data-label="Amount"><img style={{height:"30px", width:"30px"}} src={item?.img} alt="img" /></td>
                <td data-label="Period"><button onClick={() => deleteService(item?._id)} style={{backgroundColor:"#FCF6F5", cursor:"pointer"}}>Delete</button></td>
            </tr>
        ))
    }
   
  </tbody>
</table>
    )
}

export default DataTable;
