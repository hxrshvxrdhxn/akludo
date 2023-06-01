import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Chips() {
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
            <div className='card'>
                <div className='head-card'>
                    <h3>Winning Chips</h3>
                </div>
                <div className='body text-center text-para'>
                    <p>These chips  is  withdraw from bank, or UPI</p>
                    <br />
                    <strong className='mt20'>Chips</strong>
                    <div className='mt10'>0.00</div>
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
                    <div className='mt10'>0.00</div>
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