import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import { toast,ToastContainer } from 'react-toastify';

function Chips() {

    const [User,SetUser]=useState({});

    useEffect(()=>{
        (async function (){
            try{
                const user=await UserService.getUser();
                console.log(user);
                SetUser(user);
            }catch(c){
                console.log(c);
                toast.error(c.message);
            }
        })();
    },[])
    const navigate = useNavigate();

    const AddToChips = () => {
        navigate('/deposit', { replace: true });
    }
    const WithdrawToChips = () => {
        navigate('/withdraw', { replace: true });
    }


    return (
        <>
            <Header />
            <ToastContainer/>
            <div className='card'>
                <div className='head-card'>
                    <h3>Winning Chips</h3>
                </div>
                <div className='body text-center text-para'>
                    <p>These chips  is  withdraw from bank, or UPI</p>
                    <br />
                    <strong className='mt20'>Chips</strong>
                    <div className='mt10'>{User?.wallet?.earning+User?.referral?.earning}</div>
                    <br />
                    <button className='btn-green' onClick={WithdrawToChips} >Withdraw Chips</button>
                </div>
            </div>
            <div className='card'>
                <div className='head-card'>
                    <h3>Deposit Chips</h3>
                </div>
                <div className='body text-center text-para'>
                    <p>These chips  is  not  withdraw from bank, or UPI
                        only use for play games.</p>
                    <br />
                    <strong className='mt20'>Chips</strong>
                    <div className='mt10'>{User?.wallet?.bal-User.wallet?.earning}</div>
                    <br />
                    <button className='btn-green' onClick={AddToChips} >Add Chips</button>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(Chips);