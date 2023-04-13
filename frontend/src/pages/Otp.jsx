import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

function Otp(props) {
    console.log("Umar pahat", props.phone)
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
        navigate('/');
    }
    return (
        <>
            <>
                <div className='label-input mt10'><label>Phone</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Enter Phone number' onChange={handler} className='input-white' name='otp' />
                </div>
            </>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(Otp);