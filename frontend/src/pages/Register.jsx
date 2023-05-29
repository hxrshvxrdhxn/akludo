import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../services/login.service';


function Register(props) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState();
    const [ctx, setCtx] = useState(null)
    const [otp, setOtp] = useState()
    const [showResults, setShowResults] = useState(false)

    const handler = (e) => {
        console.log(e.target.value)
        setPhone(e.target.value)
    }

    const handlerOtp = (e) => {
        console.log(e.target.value)
        setOtp(e.target.value)
    }

    const continueBtn = async (e) => {
        e.preventDefault();
        setShowResults(true)
        props.dispatch({ type: 'PHONE_NUMBER', phone });
        console.log(phone)
        try {
            let data = await Login.sendOtp(phone);
            console.log(data);
            if (data && data.ctx) {
                setCtx(data.ctx)
            }
        } catch (c) {
            console.log(c);
        }
    }

    const submitRegister = async (e) => {
        e.preventDefault();
        props.dispatch({ type: 'PHONE_NUMBER', phone });
        try {
            if (ctx) {
                let data = await Login.verifyOtp(otp, ctx);
                console.log(data);
                if (data && data.id) {
                    const uid=data.id;
                    console.log("UID", uid, data.id)
                    props.dispatch({ type: 'USER_ID', uid });
                }

                navigate('/new-password', { replace: true });
            }
        } catch (c) {
            console.log(c);
        }
    }
    
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Register</h3>
                </div>
                <form onSubmit={submitRegister}>
                    <div className='label-input mt10'><label>Phone</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter Phone number' onChange={handler} className='input-white' name='phone' />
                    </div>

                    {showResults ? <> <div className='label-input'><label>OTP</label></div>
                        <div className='small-body section-center'>
                            <input placeholder='Enter OTP' onChange={handlerOtp} className='input-white' name='otp' />
                        </div></> : null}

                    {showResults ? <>   <div className='label-input mt10'><label>Refar Code (Optional)</label></div>
                        <div className='small-body section-center'>
                            <input placeholder='Refer code' onChange={handler} className='input-white' name='referCode' />
                        </div></> : null}
                    <p className='label-input'>By continuing, you agree to our <a href="/terms">Legal Terms</a> and you are legal age should be 18 years</p>
                    {showResults ? <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>VERIFY</button>
                    </div> : <div className='text-center mt20'>
                        <button className='btn-green' type='button' onClick={continueBtn}>Continue</button>
                    </div>
                    }
                    {showResults ? null :
                        <div className='label-input mb20 mt10 text-center'>
                            <label>Already have an account? <Link to={'/login'} className='green-text'>Login In</Link></label>
                        </div>}

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