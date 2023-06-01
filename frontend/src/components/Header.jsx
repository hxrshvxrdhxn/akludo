import React from 'react'
import Logo from './Logo';
import Burger from './Burger';
import Cash from './Cash';
import Profile from './Profile';

function Header() {
    return (
        <header>
            <Burger></Burger>
            <Logo></Logo>
            <div className='rightNav'>
                <Cash></Cash>
                <Profile></Profile>
            </div>
        </header>
    )
}
export default Header
