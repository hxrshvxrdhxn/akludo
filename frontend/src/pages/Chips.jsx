import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import { toast, ToastContainer } from 'react-toastify';

function Chips(props) {
    const [User, SetUser] = useState({ wallet: props.wallet });

    useEffect(() => {
        (async function () {
            try {
                const user = await UserService.getUser();
                console.log("user -------> ", user);
                console.log("props.wallet-------------->", props.wallet || user.wallet.bal);
                SetUser(user);
            } catch (c) {
                toast.error(c.message);
            }
        })();
    }, [])
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
            <ToastContainer />
            <div className='card'>
                <div className='head-card'>
                    <h3>Winning Chips</h3>
                </div>
                <div className='body text-center text-para'>
                    <p>These chips can be withdrawn from bank, or UPI, Minimum withdrawable chips must be 95 or greater</p>
                    <br />
                    <strong className='mt20'>Chips</strong>
                    <div className='mt10'>{User?.wallet?.earning + User?.referral?.earning || 0.0}</div>
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
                    <div className='mt10'>{props?.wallet || User?.wallet?.bal}</div>
                    <br />
                    <button className='btn-green' onClick={AddToChips} >Add Chips</button>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        wallet: state.wallet
    };
}

export default connect(mapStateToProps)(Chips);