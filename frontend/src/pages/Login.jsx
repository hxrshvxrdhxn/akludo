import React, { useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState({ username: '', password: '' });


    const handler = (e) => {
        console.log(e.target.value)
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts", login)
            .then(response => {
                console.log(response)
                // this.state({ posts: response.data })
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
                    <h3>Login</h3>
                </div>
                <form onSubmit={submitForm}>
                    <div className='label-input mt10'><label>Username</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Username' onChange={handler} className='input-white' name='username' />
                    </div>
                    <div className='label-input'><label>Password</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Password' type="password" onChange={handler} className='input-white' name='password' />
                    </div>
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

export default Login
