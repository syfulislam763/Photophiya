
const baseUrl = "https://photophiya.herokuapp.com";






export const deleteService = async (id, url, setter) => {
    console.log("hello")
    try{
        let response = await fetch(`${baseUrl}/${url}/${id}`, {method:"DELETE"});
        let data = await response.json();
        if(data){
            setter && setter("Deleted Successfully");
            setTimeout(() => {
                setter && setter("")
            }, 3000);
        }
    }catch(err){

    }
}



export const getLogin = async (password, email, setter, cb) => {
    try{

        let res = await fetch(`${baseUrl}/users`);
        let users = await res.json();
        if(users){
            let user = users?.find(usr => usr?.email === email && usr?.password === password);
            if(user){
                setter && setter(user);
                cb && cb(user);
            }else{
                setter && setter({message: "User don't exist or username, password worng"})
            }
        }else{
            setter && setter({message: "User don't exist or username, password worng"})
        }
        
    }catch(err){
        console.log(err)
    }
}

export const  getAllServices = async (setter) => {
    try{
        let res = await fetch(`${baseUrl}/services`);
        let services = await res.json();
        if(services){
            setter && setter(services);
        }
    }catch(err){
        setter && setter([]);
    }
}

export const createUser = async (payload, setter, cb) => {
    
    try{
        let res = await fetch(`${baseUrl}/createUser`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        });
        let data = await res.json();
        if(data){
            setter && setter(data?.message);
            cb && cb(payload)
            setTimeout(() => {
                setter && setter("");
            }, 3000)
        }
    }catch(err){
        setter && setter("");
    }
}

export const placeOrder = async (payload, setter, cb) => {
    try{
        let res = await fetch(`${baseUrl}/order`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        });

        let data = await res.json();

        if(data){
            setter && setter(data?.message)
            cb && cb();
            setTimeout(() => {
                setter && setter("")
            }, 3000)
        }

    }catch(err){
        setter && setter("")
        console.log(err)
    }
}

export const getUsers = async (setter) => {
    try{
        let res = await fetch(`${baseUrl}/users`);
        let users = await res.json();
        if(users){
            setter && setter(users);
        }
    }catch(err){
        console.log(err)
    }
}

export const getCustomerOrder = async (label, setter, email) => {
    try{
        let res = await fetch(`${baseUrl}/customersOrder`);
        let data = await res.json();
        if(data){
            if(label==="user"){
                setter(data?.filter(order => order?.email === email))
            }else if(label==="admin")  {
                setter(data);
            } 
        }
    }catch(err){
        console.log(err)
    }
}