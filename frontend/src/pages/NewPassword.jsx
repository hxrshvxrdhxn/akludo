import React, { useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';

function NewPassword() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });


    const handler = (e) => {
        console.log(e.target.value)
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts", newPassword)
            .then(response => {
                console.log(response)
                // this.state({ posts: response.data })
            })
            .catch(error => {
                console.log(error)
            })

        navigate('/', { replace: true });

    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Set New Password</h3>
                </div>
                <form onSubmit={submitForm}>
                    <div className='label-input mt10'><label>New Password</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Must be at least 8 characters.' onChange={handler} className='input-white' name='password' />
                    </div>
                    <div className='label-input'><label>Confirm Password</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Confirm Password' type="password" onChange={handler} className='input-white' name='confirmPassword' />
                    </div>
                    <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>Set Password</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewPassword
