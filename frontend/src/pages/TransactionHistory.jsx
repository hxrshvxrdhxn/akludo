import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import moment from 'moment';
import UserService from '../services/user.service';

function TransactionHistory() {
    const [ledger, setLedger] = useState([])
    const [wallet, setWallet] = useState([])
    const [user, setUser] = useState('');


    function txtype(item) {
        if (item === 'TOP_UP') {
            return 'ADDED'
        }
        if (item === 'TRANSFER') {
            return 'LOST'
        }

        if (item === 'WIDTHDRAWAL') {
            return 'Widthdrawal'
        }

        if (item === 'HOLD') {
            return 'Pending'
        }
    }


    useEffect(() => {
        async function test() {
            const data = await UserService.getUser()
            console.log('ledger --------------==>', data?.wallet?.ledger)
            setUser(data?.id)
            setLedger(data?.wallet?.ledger)
            setWallet(data?.wallet)
        }
        test()
    }, [])

    function winlost(item) {
        console.log(item);
        if (user === item?.winner?.id) {
            return "WON"
        } else {
            return "LOST"
        }
    }

    function loser(item) {
        if (user === item?.contender?.id) {
            console.log("loser is equal to contender", user, item.contender.id)
            return item?.challenger?.name
        } else {
            console.log("loser is not equal to contender", user, item.contender.id)
            return item?.contender?.name
        }
    }

    //{winlost(item?.linkedChallenge)} Against {loser(item.linkedChallenge)} 

    const listItems = ledger.map((item, i) =>
        <li key={i}>
            <strong className='mt10'>{moment.unix(item.createdAt).format("DD MMM YY")} <br /> {moment.unix(item.createdAt).format('LT')}</strong>
            <div className='mt10'>{txtype(item?.txType)}  <br />

                Status: {item?.linkedBankTransaction?.status}
            </div>
            <span className='mt10 text-right'>
                {txtype(item?.txType) ? <strong className='green-txt '>(+)</strong> : <strong className='red-txt '>(-)</strong>} ₹{item.amount}<br />
                closing balance : ₹{wallet?.bal}
            </span>

            <div> OrderId: {item?.linkedBankTransaction?.id}</div>
            {winlost(item?.linkedChallenge)} Against {loser(item.linkedChallenge)} <br />
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