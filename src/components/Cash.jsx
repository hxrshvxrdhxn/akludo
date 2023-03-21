import React from 'react'

const handleClick = (e) => {
    console.log('this is:', e);
};
function Cash() {
    return (
        <div className='cash-box'>
            <a className='wallet-txt' href='/deposite'> 500 </a>
        </div>
    )
}
export default Cash
