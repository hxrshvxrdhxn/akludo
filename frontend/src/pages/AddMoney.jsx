import React, { useState } from 'react'
import axios from "axios";
import Header from '../components/Header'

function AddMoney() {
    const [amount, setAmount] = useState({ amount: '' });
    const setValue = (e) => {
        setAmount({ amount: e.target.value })
    }

    const clickHandler = (e) => {
        setAmount({ amount: e.target.value })
    }

    const submitAddMoney = (e) => {
        e.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/posts", amount)
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
                    <h3>Choose amount to add</h3>
                </div>
                <form onSubmit={submitAddMoney}>
                    <div className='body'>
                        <input placeholder='₹ Amount' type="number" value={amount} onChange={setValue} className='input-white' name='amount' />
                        <br />
                        <span className='text-label'>Min: 10, Max: 10000</span>
                    </div>
                    <div className='text-center mb20'>
                        <div className="btn-box mb20">
                            <div>
                                <button className='btn-black-large' value="100" onClick={clickHandler}>₹ 100</button>
                            </div>
                            <div>
                                <button className='btn-black-large' value="200" onClick={clickHandler}>₹ 200</button>
                            </div>
                            <div>
                                <button className='btn-black-large' value="500" onClick={clickHandler}>₹ 500</button>
                            </div>
                            <div>
                                <button className='btn-black-large' value="1000" onClick={clickHandler}>₹ 1000</button>
                            </div>
                        </div>
                        <button className='btn-green' type='submit'>NEXT</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddMoney