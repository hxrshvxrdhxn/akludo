import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WalletService from '../services/wallet.service';



const handleClick = (e) => {
    console.log('this is:', e);
};
function Cash(props) {

    const [wallet,setWallet]=useState({});

    useEffect(()=>{
        async function getWallet(){
            let wallt=await WalletService.getWallet();
            console.log(wallt);
            setWallet(wallt[0]);
        }
        getWallet();
    },[]);

    return (
        <div className='cash-box'>
            <Link className='wallet-txt' to='/deposit'> {wallet.bal}</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        amount: state.amount
    };
}

export default connect(mapStateToProps)(Cash);

