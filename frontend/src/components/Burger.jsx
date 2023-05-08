import React from 'react'
import Profile from './Profile';
import { useNavigate } from 'react-router';
import UserService from '../services/user.service';
import Login from '../services/login.service';


function Burger() {
    const navigate = useNavigate();

    async function handleLogout(){
        try {
            let data=await Login.logout();
            console.log(data);
            navigate('/login', { replace: true });
        } catch (c) {
            console.log(c);
        }
    }

    return (
        <nav role="navigation" className='navBar'>
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">
                    <li><div className='topBurger'><h2>Hey, Sunil Kumar</h2></div></li>
                    <li><a href="#">Play</a></li>
                    <li><a href="#">Wallet</a></li>
                    <li> <a href="#">History</a></li>
                    <li><a href='#'>Refer & Earn</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Support</a></li>
                    <li> <a href="#">Legal Terms</a></li>
                    <li onClick={handleLogout}><a>Logout</a></li>
                </ul>
            </div>
        </nav >
    )
}
export default Burger
