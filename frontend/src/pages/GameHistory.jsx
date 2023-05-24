import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import UserService from '../services/user.service';
import ChallengeService from '../services/challenge.service';

function GameHistory() {
    const [game, setGame] = useState([])

    useEffect(() => {
        async function test() {
            let user = await UserService.getUser()
            let gameHistories = await ChallengeService.gameHistory(user.id);
            setGame(gameHistories)
            console.log("Game history=========>", game)
        }
        test();
    }, [])


    const listItems = game.map((item, i) =>
        <li key={i}>
            <strong className='mt10'>15 May <br /> at 5:52 pm</strong>
            <div className='mt10'>Cash added<br />
                OrderID: MSG-1684153365<br />
                Status: {item?.status ? 'Success' : 'Cancelled'}  <br />
                Transaction is Successful
            </div>
            <strong className='mt10 text-center'>
                {item?.amount? <><span className='green-txt '>(+)</span>  ₹{item?.amount}<br />
                    <span className='downArrow'>&#10140;</span></> : <><span className='red-txt'>(x)</span> ₹{item?.amount}</>}

            </strong>
        </li>

    );
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Game History</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className='text-center'>
                    <ul className='challenge-list text-left'>
                        {listItems}
                    </ul>
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

export default connect(mapStateToProps)(GameHistory);