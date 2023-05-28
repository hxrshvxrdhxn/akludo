import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import UserService from '../services/user.service';
import { ToastContainer, toast } from 'react-toastify';


function Burger() {
    const navigate = useNavigate();
    const [username, setUsername] = useState()

    useEffect(() => {
        async function test() {
            try {
                let user = await UserService.getUser();
                setUsername(user.name)
            } catch (c) {
                console.log(c);
                toast.error(c.message);
                throw new Error(c)
            }
        }
        test();
    }, []);


    async function handleLogout() {
        try {
            let data = await UserService.logout();
            console.log(data);
            //TO DO check if cookie exist if so clear it again just for sureity
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
                    <li><div className='topBurger'><h2>Hey, {username}</h2></div></li>
                    <li><a href="/">Win to cash</a></li>
                    <li><a href="/deposit">Wallet</a></li>
                    <li> <a href="/game-history">Game History</a></li>
                    <li> <a href="/transaction-history">Transaction History</a></li>
                    <li><a href='/refer'>Refer & Earn</a></li>
                    <li><a href="/user-profile">Profile</a></li>
                    <li><a href="/support">Support</a></li>
                    <li> <a href="/terms-condition">Legal Terms</a></li>
                    <li onClick={handleLogout}><a>Logout</a></li>
                </ul>
            </div>
        </nav >
    )
}
export default Burger
