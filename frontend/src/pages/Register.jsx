import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';


function Register(props) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState()
    const [showResults, setShowResults] = useState(false)

    const handler = (e) => {
        console.log(e.target.value)
        setPhone({ ...phone, [e.target.name]: e.target.value })
    }

    const continueBtn = (e) => {
        e.preventDefault();
        setShowResults(true)
        props.dispatch({ type: 'PHONE_NUMBER', phone });
        axios.post("https://jsonplaceholder.typicode.com/posts", phone)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
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
        navigate('/new-password', { replace: true });
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
                            <input placeholder='Enter OTP' onChange={handler} className='input-white' name='otp' />
                        </div></> : null}
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