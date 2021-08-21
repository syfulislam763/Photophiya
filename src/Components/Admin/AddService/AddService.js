import React, { useEffect, useState } from 'react'
import "./AddService.css";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { storage } from '../../../firebase.confing';
import { toast } from 'react-toastify';
import DataTable from './DataTable';
import { getAllServices } from '../../../CommonFunc/CommonFunctions';



const AddService = () => {

    const [services, setServices] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null)
    const [imgUrl, setImgUrl] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [deleteMsg, setDeleteMsg] = useState("");
    const imageType = ["image/png", "image/jpeg"];
   

    

   const schema = Yup.object().shape({
        // img: Yup.string().required("Image Required"),
        title: Yup.string().required("Title Required"),
        price: Yup.string().required("Price Required"),
        description: Yup.string().required("Description Required")
   });
    const initValues = {
        img: "",
        title: "",
        price: "",
        description: ""
    }
    const formk = useFormik({
        initialValues:initValues,
        validationSchema: schema,
        onSubmit: async (values, actions) => {
            const payload  = {
                ...values,
                img: imgUrl,
            }

            if(imgUrl){
                try{
                    let response = await fetch("https://photophiya.herokuapp.com/addService", {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(payload)
                })
                let data = await response.json();
                if(data){
                    setSuccessMsg("Created Successfully")
                    // toast.success("Created Successfully");
                    setTimeout(() => {
                        setSuccessMsg("")
                    }, 2000)
                    actions.resetForm();
                }
                }catch(err){
                    setSuccessMsg("");
                }
                
            }
           
        }
    })


    const handleFile = e => {
        let file = e.target.files[0];
        if(imageType.includes(file.type)){
            
            const storageRef = storage.ref(file.name);

            storageRef.put(file).on('state_changed', snap => {
                let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
                    setUploadStatus(percentage)
            }, err => {
                toast.error("Failed to upload image")
            }, async () => {
                const url = await storageRef.getDownloadURL();
                if(url){
                    setImgUrl(url);
                    // toast.success("Uploaded successfully");
                setUploadStatus(null)
                }
                
            })


        }else{
            toast.warn("File type is not valid");
        }
    }

    const deleteService = async id => {

        try{
            let response = await fetch("https://photophiya.herokuapp.com/deleteService/"+id, {method:"DELETE"});
            let data = await response.json();
            if(data){
                setDeleteMsg("Deleted Successfully");
                setTimeout(() => {
                    setDeleteMsg("")
                }, 3000);
            }
        }catch(err){

        }
    }

    useEffect(() => {
        getAllServices(setServices);
    }, [successMsg, deleteMsg])

    return (
        <div className="add-service-wrapper">
            <div className="add-service-header">
                <h3>Add Service</h3>
                <button onClick={() => formk.handleSubmit()}>Save</button>
            </div>

            <div className="add-service-form">
                <div className="form-field">
                    <label><strong>Title</strong></label><br/>
                    <input onChange={formk.handleChange} value={formk?.values?.title} name="title" type="text"/>
                    {formk?.errors?.title && <p className="error-style">{formk?.errors?.title}</p>}
                </div>
                
                <div className="form-field">
                    <label><strong>Description</strong></label><br/>
                    <textarea onChange={formk.handleChange} value={formk?.values?.description} name="description" type="textarea"/>
                    { formk?.errors?.description && <p className="error-style">{formk?.errors?.description}</p>}
                </div>
                <div className="form-field">
                    <label><strong>Price</strong></label><br/>
                    <input onChange={formk.handleChange} value={formk?.values?.price} name="price" type="number"/>
                    {formk?.errors?.price && <p className="error-style">{formk?.errors?.price}</p>}
                </div>
                <div className="form-field">
                    <label><strong>Upload Image</strong></label><br/>
                    <input onChange={handleFile} value={formk?.values?.img} name="img" type="file"/>
                    {formk?.errors?.img && <p className="error-style">{formk?.errors?.img}</p>}
                    {uploadStatus && <p style={{fontSize:"11px", margin:"0px", padding:"0px"}}>Uploading...</p>}
                </div>
                
            </div>
            {successMsg && <p style={{color:"green", fontSize:"11px"}}>{successMsg}</p>}

            <div>
                <DataTable services={services} deleteService={deleteService}/>
            </div>
        </div>
    )
}

export default AddService;
