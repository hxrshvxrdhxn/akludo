import React, { useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';

function ChoosePayOption(props) {
    const navigate = useNavigate();
    const [amount, setAmount] = useState({ amount: props.money });

    const backToEdit = () => {
        navigate('/deposit', { replace: true });
    }
    const AddAmount = (e) => {
        e.preventDefault();
        props.dispatch({ type: 'ADD_AMOUNT', amount });
        axios.post("https://jsonplaceholder.typicode.com/posts", amount)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        navigate('/ludo-classic', { replace: true });
    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Amount to be added ₹ {props.money}</h3>
                    <div className='view-all'><button onClick={backToEdit} className='btn-edit'>EDIT</button></div>
                </div>

                <div className='small-body mt20'>
                    <div className='heading'>Pay Through UPI</div>
                    <button className='btn-select-option'>  <img src='../images/upi.png' alt='Deposit here' /> Deposit here </button>
                    <button className='btn-select-option'>  <img src='../images/barcode.png' alt='Scan QR Code' /> Scan QR Code </button>
                    <div className='heading mt20'>Other Options</div>
                    <button className='btn-select-option'>  <img src='../images/wallets.png' alt='Other Wallets' /> Other Wallets </button>
                    <button className='btn-select-option'>  <img src='../images/netbanking.png' alt='Net Banking' /> Net Banking </button>
                </div>
                <div className='body text-center'>
                    <button onClick={AddAmount} className='btn-green'>NEXT</button>
                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        money: state.money
    };
}

export default connect(mapStateToProps)(ChoosePayOption);