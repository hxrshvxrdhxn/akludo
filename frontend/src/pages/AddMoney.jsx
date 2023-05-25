import React, { useEffect, useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TransactionService from '../services/transaction.service';
import LedgerService from '../services/ledger.service';
import WalletService from '../services/wallet.service';
import { ToastContainer, toast } from 'react-toastify';

function AddMoney(props) {
    const navigate = useNavigate();
    const [money, setMoney] = useState({ money: props.money });
    const [transaction,setTransaction]=useState({status:'PENDING',gateway:'Cashfree',gatewayMethod:'',amount:money.money,txType:'TOP_UP'})
    const [ledger,setLedger]=useState({fromUser:"64476ae2ccbeff3c46116058",toUser:"64476ae2ccbeff3c46116058",amount:money.money,txType:'TOP_UP'});
    const setValue = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
        setMoney({ [e.target.name]: e.target.value })
        setTransaction({...transaction,amount:parseInt(e.target.value)});
        setLedger({...ledger,amount:parseInt(e.target.value)});
        }
    }

    const clickHandler = (e) => {
        setMoney({ [e.target.name]: e.target.value })
        setTransaction({...transaction,amount:parseInt(e.target.value)});
        setLedger({...ledger,amount:parseInt(e.target.value)});
    }

    const submitAddMoney = async(e) => {
        e.preventDefault();
        try{
            if (e.target.money[0].value <= 0) {
                toast.error('Enter amount greater then 0');
                return false
            } else {
            props.dispatch({ type: 'ADD_MONEY', money });
            let trans=await TransactionService.createTransaction(transaction);
            console.log(trans);
            setTransaction({...transaction,transactionId:trans.id});
            //redirect to payment gateway
            if(trans.meta){
                let meta=JSON.parse(trans.meta);
                console.log(meta); 
                const cashfree=new window.Cashfree(meta.sessionId);
                console.log(cashfree);
                cashfree.redirect();
            }
            {
                // create a  ledger
            // if(trans.id){
            //     let led=await LedgerService.createLedger(ledger,trans.id);
            //     //console.log(led);
            //     //get the wallet using userid
            //     let wallet=await WalletService.getWallet();
            //     //console.log(wallet);
            //     //updating wallet
            //     if(led&&led.id&&wallet[0].id){
            //         const amount=led.amount+wallet[0].bal;
            //         console.log(amount);
            //         let updatedwallet=await WalletService.updateBalanceOrLedger(wallet[0].id,amount,JSON.stringify(led.id),'DEPOSIT');
            //         console.log(updatedwallet);
            //         setMoney({money:0});
            //     }
            // }
            }
            
        }
            

        }catch(c){
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
                        <input placeholder='₹ Amount' type="number"  pattern="[0-9]" value={money.money} onChange={setValue} className='input-white' name='money' />
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