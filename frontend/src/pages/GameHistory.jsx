import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';

function GameHistory() {
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
                        <li>
                            <strong className='mt10'>15 May <br /> at 5:52 pm</strong>
                            <div className='mt10'>Cash added<br />
                                OrderID: MSG-1684153365<br />
                                Status: Success  <br />
                                Transaction is Successful
                            </div>
                            <strong className='mt10 text-center'>
                                <span className='green-txt '>(+)</span>  ₹1000<br />
                                <span className='downArrow'>&#10140;</span>
                            </strong>
                        </li>

                        <li>
                            <strong className='mt10'>15 May <br /> at 5:52 pm</strong>
                            <div className='mt10'>Cash added<br />
                                OrderID: MSG-1684153365<br />
                                Status: Cancelled</div>
                            <strong className='mt10'>
                                <span className='red-txt'>(x)</span> ₹1000<br />
                            </strong>
                        </li>
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