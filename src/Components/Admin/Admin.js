import React, { useEffect, useState } from 'react';
import "./Admin.css";
import Cross from '../../images/close.png';
import Menu from '../../images/menu.png';

import { useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import AddService from './AddService/AddService';
import CustomerOrder from './CustomerOrder/CustomerOrder';
import { getUsers } from '../../CommonFunc/CommonFunctions';


const Admin = () => {

    const [isOpenNavbar, setIsOpenNavbar] = useState(true)
    const {path, url} = useRouteMatch();



    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers(setUsers);
    }, [])


    return (
        <div className="admin-container">
            {
                isOpenNavbar && <div className="admin-navbar">
                <div className="db-h">
                    <h2><Link style={{textDecoration:"none", color:"gray", cursor:"pointer"}} to={url}>DASHBOARD</Link></h2>

                    <img onClick={() => setIsOpenNavbar(bool => !bool)} src={Cross} alt="cross" />
                </div>

                <ul className="admin-ul">
                    <Link style={{textDecoration:"none", color:"gray", cursor:"pointer"}} to={`${url}/addService`}><li className="li">ADD SERVICE</li></Link>
                    <Link style={{textDecoration:"none", color: "gray", cursor: "pointer"}} to={`${url}/customerOrder`}><li className="li">CUSTOMER'S ORDER</li></Link>
                </ul>
            </div>
            }

            <div className="admin-content-area">
                {
                    !isOpenNavbar && <div className="db-h db-h-w">
                    <img onClick={() => setIsOpenNavbar(bool => !bool)} src={Menu} alt="Menu" />
                </div>
                }
                <Switch>
                    <Route exact path={path}>
                       <div style={{height:"600px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <h1 style={{color:"gray"}}>TOTAL USERS {users.length}</h1>
                       </div>
                    </Route>
                    <Route exact path={`${path}/addService`}>
                           <AddService/>
                    </Route>
                    <Route exact path={`${path}/customerOrder`}>
                        <CustomerOrder/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Admin;
