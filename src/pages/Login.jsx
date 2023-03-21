import React from 'react'
import Header from '../components/Header'

function Login() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Login</h3>
                </div>
                <div className='label-input mt10'><label>Username</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Username' className='input-white' name='amount' />
                </div>
                <div className='label-input'><label>Password</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Password' className='input-white' name='amount' />
                </div>
            
                <div className='text-center mt20'>
                    <button className='btn-green'>Login</button>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default Login
