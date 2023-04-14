import React, { useState } from 'react'
import Profile from './Profile'

function ChanllenceList() {
    const [amount, setAmount] = useState(100)
    return (
        <>
            <div className='card'>
                <div className='head-card'>
                    <h3>Create a Challenge</h3>
                </div>
                <div className='body section-center'>
                    <input placeholder='Amount' className='input-white' name='amount' /> <button  className='btn-green ml10'>SET</button>
                </div>
            </div>
            <div className='card'>
                <div className='head-card'>
                    <h3>Open Challenge</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className=''>
                    <ul className='challenge-list'>
                        <li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text'>₹ 100</div>  <button className='btn-play'>Play</button>
                        </li>
                        <li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text'>₹ 100</div>  <button className='btn-play'>Play</button>
                        </li>
                        <li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text'>₹ 100</div>  <button className='btn-play'>Play</button>
                        </li>
                        <li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text'>₹ 100</div>  <button className='btn-play'>Play</button>
                        </li>
                        <li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text'>₹ 100</div>  <button className='btn-play'>Play</button>
                        </li>
                        <li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text'>₹ 100</div>  <button className='btn-play'>Play</button>
                        </li>
                    </ul>

                </div>
            </div>
            <div className='card'>
                <div className='head-card'>
                    <h3>Running Challenge</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className=''>
                    <ul className='challenge-list running'>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                        <li>
                            <div className='direction'><img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ 100</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> Sunil Kumar</div>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default ChanllenceList