import React from 'react'
import Header from '../components/Header'

function Register() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Register</h3>
                </div>
                <div className='label-input mt10'><label>Phone</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Enter Phone number' className='input-white' name='amount' />
                </div>
                <div className='label-input'><label>Otp</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Enter Otp' className='input-white' name='amount' />
                </div>

                <div className='text-center mt20'>
                    <button className='btn-green'>Register</button>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default Register
