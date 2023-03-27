import axios from 'axios'
import React, { useState } from 'react'
import Header from '../components/Header'

function Register() {
    const [register, setRegister] = useState({ phone: '', otp: '' })

    const handler = (e) => {
        console.log(e.target.value)
        setRegister({ ...register, [e.target.name]: e.target.value })

    }

    const submitRegister = (e) => {
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts", register)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
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
                    <div className='label-input'><label>Otp</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter Otp' onChange={handler} className='input-white' name='otp' />
                    </div>
                    <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
