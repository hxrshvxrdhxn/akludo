import React, { useEffect, useState } from 'react'
import Logo from './Logo';
import Burger from './Burger';
import Cash from './Cash';
import Profile from './Profile';

function Header() {
    const [auth, setAuth] = useState(null);
    function isAuth() {
        let name = "_aklpsk";
        var match = document.cookie.split(';');
        match = match.filter(item => item.match(RegExp('(^| )' + name + '=([^;]+)'))).map(item => item.split('=')).flat();
        if (match.length && match[0].match('_aklpsk') && match[1]) {
            setAuth(true);
        } else {
            setAuth(false);
        }
        return;
    }
    useEffect(() => {
        isAuth()
    }, [])

    return (
        <header>

            {auth ? <Burger></Burger> : <nav role="navigation" className='navBar'>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <li><div className='topBurger'><h2>Hey,</h2></div></li>
                        <li><a href="/">Home</a></li>
                        <li> <a href="/about">About Us</a></li>
                        <li> <a href="/terms-condition">Terms & Condition</a></li>
                        <li> <a href="/privacy-policy">Privacy policy</a></li>
                        <li> <a href="/refund-policy">Refund policy</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>
            </nav >
            }
            <Logo></Logo>
            {auth ?
                <div className='rightNav'>
                    <Cash></Cash>
                    <Profile></Profile>
                </div> : <div className='rightNav'><div className='mt30'><a className="btn-green wallet-txt" href='/login'>Login</a>  <a href='/register' className="btn-green wallet-txt" type="submit">Register</a> </div></div>}
        </header>
    )
}
export default Header
