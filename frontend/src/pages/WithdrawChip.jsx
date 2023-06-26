import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../services/user.service';
import WalletService from '../services/wallet.service';
import TransactionService from '../services/transaction.service';

function WithdrawChip(props) {
    const [User, SetUser] = useState({});
    const [money, setMoney] = useState({ money: props.money });

    useEffect(() => {
        (async function () {
            try {
                const user = await UserService.getUser();
                console.log(user);
                SetUser(user);
            } catch (c) {
                console.log(c);
                toast.error(c.message);
            }
        })();
    }, [])

    const setValue = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setMoney({ [e.target.name]: e.target.value })
        }
    }
    const submitWithdrawMoney = async (e) => {
        e.preventDefault();
        try {
           //create a Bank transaction
           let trans=await TransactionService.createTransaction({status:'PENDING',gatewayMethod:'admin_panel',amount:250,txType:'WITHDRAW'});
           console.log("withdrawal request created for transaction",trans);
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
                    <h3>Withdrawable Chips ₹ {User?.wallet?.earning + User?.referral?.earning || 0.0}</h3>
                </div>
                <ToastContainer />
                <form onSubmit={submitWithdrawMoney}>
                    <div className='body'>
                        <input placeholder='₹ Enter chips' type="number" pattern="[0-9]"onChange={setValue} className='input-white' name='money' />
                        <br />
                        <span className='text-label'>Min: ₹ 95, Max: ₹ 10000</span>
                    </div>
                    <div className='text-center mb20'>
                        <button className='btn-green' type='submit'>Submit</button>
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

export default connect(mapStateToProps)(WithdrawChip);