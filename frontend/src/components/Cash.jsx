import React from 'react'
import { Link } from 'react-router-dom';

const handleClick = (e) => {
    console.log('this is:', e);
};
function Cash() {

    return (
        <div className='cash-box'>
            <Link className='wallet-txt' to='/deposit'> 800</Link>
        </div>
    )
}
export default Cash
