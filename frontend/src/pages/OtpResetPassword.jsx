import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { useNavigate,useLocation } from 'react-router-dom';
import Login from '../services/login.service';

function OtpResetPasword(props) {
    const navigate = useNavigate();
    const [phoneOtp, setPhoneOtp] = useState({ phone: props.phone, otp: '' });
    const location= useLocation();


    const handler = (e) => {
        console.log(e.target.value)
        setPhoneOtp({ ...phoneOtp, [e.target.name]: e.target.value })
    }

    // useEffect(()=>{
    //     console.log(phoneOtp);
    //     console.log(location.state.context);
    // },[])

    const submitRegister = async(e) => {
        e.preventDefault();
        try{
            let data=await Login.verifyOtp(phoneOtp?.otp,location?.state?.context);
            console.log(data);
            navigate('/new-password');
        }catch(c){
            console.log(c);
        }
    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>OTP</h3>
                </div>
                <form onSubmit={submitRegister}>
                    <div className='label-input mt10'><label>OTP</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter OTP' onChange={handler} className='input-white' name='otp' />
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