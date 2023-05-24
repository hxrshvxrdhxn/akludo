import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import moment from 'moment';
import UserService from '../services/user.service';

function TransactionHistory() {
    const [ledger, setLedger] = useState([])
    const [wallet, setWallet] = useState([])


    useEffect(() => {
        async function test() {
            const data = await UserService.getUser()
            console.log('ledger --------------==>', data?.wallet?.ledger)
            setLedger(data?.wallet?.ledger)
            setWallet(data?.wallet)
        }

        test()
    }, [])

    const listItems = ledger.map((item, i) =>
        <li key={i}>
            <strong className='mt10'>{moment.unix(item.createdAt).format("DD MMM YY")} <br /> {moment.unix(item.createdAt).format('LT')}</strong>
            <div className='mt10'>{item?.linkedChallenge?.winner ? 'Win' : 'Lost'} Against Xyz<br />
                Battle Id: {item?.linkedBankTransaction?.id.slice(-8)}...<br />
                Status:
            </div>
            <span className='mt10 text-right'>
                <span className='red-txt '>(-)</span> ₹{item.amount}<br />
                closing balance : ₹{wallet?.bal}
            </span>
        </li>
    );


    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Transaction History</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className='text-center'>
                    <ul className='challenge-list text-left'>{listItems}</ul>
                    <br />
                    <button className='btn-green'>Back </button> <button className='btn-green'>Next </button>
                    <br />
                    <br />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        phone: state.phone
    };
}

export default connect(mapStateToProps)(TransactionHistory);