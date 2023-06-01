import React, { useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Loginn from '../services/login.service';
import { ToastContainer, toast } from 'react-toastify';

function Login(props) {
    const navigate = useNavigate();
    const [phoneError, setPhoneError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [login, setLogin] = useState({ username: '', password: '' });


    const phoneHandler = (e) => {
        const onlyDigits = e.target.value.replace(/\D/g, " ").slice(0, 10);
        if (e.target.value.length === 10) {
            setPhoneError("");
            setLogin({ ...login, [e.target.name]: onlyDigits })
        }
        if (e.target.value.length > 10) {
            setPhoneError("Can't enter greater then 10 digits.");
            return false
        }

    }

    const handler = (e) => {
        if (e.target.value.length > 0) {
            setPasswordError("");
            const onlyDigits = e.target.value
            setLogin({ ...login, [e.target.name]: onlyDigits })
            return false
        }
    }


    const submitForm = async (e) => {
        e.preventDefault();
        let reg = /^[0-9]{1,10}$/;
        if (login.username.length === 0) {
            setPhoneError("Phone can't be empty");
            return false;
        }
        if (login.username.length < 10) {
            setPhoneError("Phone should be 10 digit");
            return false;
        }

        if (!reg.test(login.username)) {
            setPhoneError("Phone number is Invalid");
            return false;
        }
        if (login.password.length === 0) {
            setPasswordError("Password can't be empty");
            return false;
        }

        try {
            let data = await Loginn.login(login.username, login.password);
            console.log(data);
            let phone = login.username
            if (data.success) {
                props.dispatch({ type: 'PHONE_NUMBER', phone });
                navigate('/', { replace: true });
            }
        } catch (c) {
            console.log(c);
            toast.error(c.message);
        }

    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Login</h3>
                </div>

                <ToastContainer />
                <form onSubmit={submitForm}>
                    <div className='label-input mt10'><label>Mobile Number</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter 10 digits Phone Number' maxLength='10' type="number"
                            pattern="[0-9]*" onChange={phoneHandler} className='input-white' name='username' />
                    </div>
                    {phoneError ? (
                        <span className='errorMsg'>
                            {phoneError}
                        </span>
                    ) : null}
                    <div className='label-input'><label>Password</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Password' type="password" onChange={handler} className='input-white' name='password' />
                    </div>
                    {passwordError ? (
                        <span className='errorMsg'>
                            {passwordError}
                        </span>
                    ) : null}
                    <div className='label-input text-right'>
                        <label> <Link to={'/reset-password'} className='green-txt reset-password'>Reset Password?</Link></label>
                    </div>

                    <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>Login</button>
                    </div>
                    <div className='label-input mb20 mt10 text-center'>
                        <label>Don't have an account? <Link to={'/register'} className='green-text'>Register</Link></label>
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

export default connect(mapStateToProps)(Login);
