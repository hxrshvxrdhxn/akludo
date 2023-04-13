import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

function OtpResetPasword(props) {
    const navigate = useNavigate();
    const [phoneOtp, setPhoneOtp] = useState({ phone: props.phone, otp: '' })

    const handler = (e) => {
        console.log(e.target.value)
        setPhoneOtp({ ...phoneOtp, [e.target.name]: e.target.value })
    }

    const submitRegister = (e) => {
        e.preventDefault();
        //props.dispatch({ type: 'PHONE_NUMBER', phone });
        axios.post("https://jsonplaceholder.typicode.com/posts", phoneOtp)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        navigate('/new-password');
    }
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>OTP {props.phone}</h3>
                </div>
                <form onSubmit={submitRegister}>
                    <div className='label-input mt10'><label>Phone</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter Phone number' onChange={handler} className='input-white' name='otp' />
                    </div>
                    <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>Otp Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(OtpResetPasword);