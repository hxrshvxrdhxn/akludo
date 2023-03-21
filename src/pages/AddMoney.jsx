import React from 'react'
import Header from '../components/Header'

function AddMoney() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Choose amount to add</h3>
                </div>
                <div className='body '>
                    <input placeholder='₹ Amount' className='input-white' name='amount' />
                    <br />
                    <span className='text-label'>Min: 10, Max: 10000</span>
                </div>
                <div className='text-center'>
                    <div className="btn-box">
                        <div>
                            <button className='btn-black-large'>₹ 100</button>
                        </div>
                        <div>
                            <button className='btn-black-large'>₹ 200</button>
                        </div>
                        <div>
                            <button className='btn-black-large'>₹ 500</button>
                        </div>
                        <div>
                            <button className='btn-black-large'>₹ 1000</button>
                        </div>
                    </div>
                    <br />
                    <button className='btn-green'>NEXT</button>

                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

export default AddMoney