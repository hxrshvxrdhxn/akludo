import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';


function Register(props) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState()

    const handler = (e) => {
        console.log(e.target.value)
        setPhone({ [e.target.name]: e.target.value })
    }

    const submitRegister = (e) => {
        e.preventDefault();
        props.dispatch({ type: 'PHONE_NUMBER', phone });
        axios.post("https://jsonplaceholder.typicode.com/posts", phone)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        navigate('/otp-reset-password', { replace: true });
    }
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Reset Password</h3>
                </div>
                <form onSubmit={submitRegister}>
                    <div className='label-input mt10'><label>Phone</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter Phone number' onChange={handler} className='input-white' name='phone' />
                    </div>
                    <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>Send Otp</button>
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

export default connect(mapStateToProps)(Register);