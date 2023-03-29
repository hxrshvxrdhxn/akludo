import React from 'react'
import Header from '../components/Header'

function Earn() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Refer your friends now!</h3>
                </div>

                <div className='small-body mt20'>
                    <div className='heading'>Refer your friends now!</div>
                    <div className='heading-equal mt20'>
                        <div className='equal-item'>
                            Current Earning: <strong>4513</strong>
                        </div>
                        <div className='equal-item'>
                            Total Earned: <strong>4513</strong>
                        </div>
                    </div>
                    <button className='btn-select-option' style={{ padding: 0, overflow: 'hidden' }}>
                        <div className='green-stripe' style={{ width: '45%' }}>
                            0%
                        </div>
                    </button>
                    <div className='heading-equal mt5 mb20'>
                        <div className='equal-item'>
                            Max: 10000
                        </div>
                        <div className='equal-item'>
                            <a href='' className='green-txt'>Redeem</a>
                        </div>
                    </div>
                    <button className='btn-select-option'>  Your Refer Code: <strong>116663</strong> </button>
                    <div className='heading text-center mt20'><strong>Total Refers: 19</strong></div>
                </div>
            </div>
            <div className='card'>
                <div className='head-card'>
                    <h3>Refer & Earn Rules</h3>
                </div>
                <div className='img-text-align mt10'>
                    <div class="left-img"> <img src='../images/winner.png' alt='Net Banking' /></div>
                    <div className="right-text" >
                        <div className='font13'>When your friend signs up on RK Ludo
                            from your referral link,</div>
                        <div className='green-txt mt5'>You get1% Commissionon yourreferral's winnings.</div>
                    </div>
                </div>

                <div className='img-text-align'>
                    <div class="left-img"> <img src='../images/offer.png' alt='Net Banking' /></div>
                    <div className="right-text" >
                        <div className='font13'>Suppose your referral plays a battle
                            for ₹10000 Cash,</div>
                        <div className='green-txt mt5'>You get₹101 Cash</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Earn