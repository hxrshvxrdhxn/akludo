import React, { useState } from 'react'
import axios from "axios";
import Header from '../components/Header'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function AddMoney(props) {
    const navigate = useNavigate();
    const [money, setMoney] = useState({ money: props.money });

    const setValue = (e) => {
        setMoney({ [e.target.name]: e.target.value })
    }

    const clickHandler = (e) => {
        setMoney({ [e.target.name]: e.target.value })
    }

    const submitAddMoney = (e) => {
        e.preventDefault();
        props.dispatch({ type: 'ADD_MONEY', money });
        axios.post("http://akludo.com", money)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        navigate('/pay-option', { replace: true });
    }


    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Choose amount to add</h3>
                </div>
                <form onSubmit={submitAddMoney}>
                    <div className='body'>
                        <input placeholder='₹ Amount' type="number" value={money.money} onChange={setValue} className='input-white' name='money' />
                        <br />
                        <span className='text-label'>Min: ₹ 50, Max: ₹ 10000</span>
                    </div>
                    <div className='text-center mb20'>
                        <div className="btn-box mb20">
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="100" onClick={clickHandler}>₹ 100</button>
                            </div>
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="200" onClick={clickHandler}>₹ 200</button>
                            </div>
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="500" onClick={clickHandler}>₹ 500</button>
                            </div>
                            <div>
                                <button type='button' name='money' className='btn-black-large' value="1000" onClick={clickHandler}>₹ 1000</button>
                            </div>
                        </div>
                        <button className='btn-green' type='submit'>NEXT</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        money: state.money
    };
}

export default connect(mapStateToProps)(AddMoney);