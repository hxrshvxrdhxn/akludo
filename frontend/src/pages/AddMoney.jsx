import React, { useEffect, useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import TransactionService from '../services/transaction.service';
import WalletService from '../services/wallet.service';
import { ToastContainer, toast } from 'react-toastify';

function AddMoney(props) {
    const [param] = useSearchParams();
    const [money, setMoney] = useState({ money: props.money });
    const [transaction, setTransaction] = useState({ status: 'PENDING', gateway: 'Cashfree', gatewayMethod: '', amount: money.money, txType: 'TOP_UP' });

    useEffect(() => {
        async function UpdateWallet() {
            const orderId = param.get('order_id');
            if (orderId) {
                //first get the order using a query and then update the transaction with amount status and payment gateway etc 
                const orderData = await TransactionService.getOrder(orderId);
                //i mean verify the transaction again beacuse there can be a case when bank transction is not updated by webhook
                // console.log(orderData);
                let transactionStatus;
                if (orderData.orderStatus === 'PAID') {     //update the bank transaction status and 
                    transactionStatus = 'SUCCESS'
                    const res = await TransactionService.updateTransactionStatus(orderData?.transaction?.id, transactionStatus);
                    let wallt = await WalletService.getWallet();
                    console.log(wallt);
                    const wallet = wallt[0].bal
                    props.dispatch({ type: 'ADD_WALLET', wallet });
                } else if (orderData.orderStatus === 'EXPIRED') {
                    transactionStatus = 'FAILED'
                    const res = await TransactionService.updateTransactionStatus(orderData?.transaction?.id, transactionStatus);
                }
                //to do update wallet for now on frontend... create a reducer for wallet 

            }
        }
        UpdateWallet();
    }, []);



    const setValue = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setMoney({ [e.target.name]: e.target.value })
            setTransaction({ ...transaction, amount: parseInt(e.target.value) });
        }
    }

    const clickHandler = (e) => {
        setMoney({ [e.target.name]: e.target.value })
        setTransaction({ ...transaction, amount: parseInt(e.target.value) });
    }

    const submitAddMoney = async (e) => {
        e.preventDefault();
        try {
            if (e.target.money[0].value <= 0) {
                toast.error('Enter amount greater then 0');
                return false
            } else {
                props.dispatch({ type: 'ADD_MONEY', money });
                let trans = await TransactionService.createTransaction(transaction);
                console.log(trans);
                setTransaction({ ...transaction, transactionId: trans.id });
                //redirect to payment gateway
                if (trans.meta) {
                    let meta = JSON.parse(trans.meta);
                    console.log(meta);
                    const cashfree = new window.Cashfree(meta.sessionId);
                    console.log(cashfree);
                    cashfree.redirect();
                }
            }
        } catch (c) {
            console.log(c.message);
        }
        //navigate('/pay-option', { replace: true });
    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Choose amount to add</h3>
                </div>
                <ToastContainer />
                <form onSubmit={submitAddMoney}>
                    <div className='body'>
                        <input placeholder='₹ Amount' type="number" pattern="[0-9]" value={money.money} onChange={setValue} className='input-white' name='money' />
                        <br />
                        <span className='text-label'>Min: ₹ 50, Max: ₹ 10000</span>
                    </div>
                    <div className='text-center mb20'>
                        <div className="btn-box mb20">
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="100" onClick={clickHandler}>₹ 100</button>
                            </div>
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="200" onClick={clickHandler}>₹ 200</button>
                            </div>
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="500" onClick={clickHandler}>₹ 500</button>
                            </div>
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="1000" onClick={clickHandler}>₹ 1000</button>
                            </div>
                        </div>
                        <button className='btn-green' type='submit'>NEXT</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        money: state.money
    };
}

export default connect(mapStateToProps)(AddMoney);