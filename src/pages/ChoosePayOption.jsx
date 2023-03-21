import React from 'react'
import Header from '../components/Header'

function ChoosePayOption() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Amount to be added ₹ 1000</h3>
                    <div className='view-all'><button className='btn-edit'>EDIT</button></div>
                </div>

                <div className='small-body mt20'>
                    <div className='heading'>Pay Through UPI</div>
                    <button className='btn-select-option'>  <img src='../images/upi.png' alt='Deposit here' /> Deposit here </button>
                    <button className='btn-select-option'>  <img src='../images/barcode.png' alt='Scan QR Code' /> Scan QR Code </button>
                    <div className='heading mt20'>Other Options</div>
                    <button className='btn-select-option'>  <img src='../images/wallets.png' alt='Other Wallets' /> Other Wallets </button>
                    <button className='btn-select-option'>  <img src='../images/netbanking.png' alt='Net Banking' /> Net Banking </button>
                </div>
                <div className='body text-center'>

                    <button className='btn-green'>NEXT</button>
                </div>

            </div>
        </>
    )
}

export default ChoosePayOption