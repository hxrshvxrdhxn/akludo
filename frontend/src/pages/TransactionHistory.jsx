import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';

function TransactionHistory() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Transaction History</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className='text-center'>
                    <ul className='challenge-list text-left'>
                        <li>
                            <strong className='mt10'>15 May <br /> 5:52 pm</strong>
                            <div className='mt10'>Lost Against Allllllll<br />
                            battle _id: 642d 68d432db
                            </div>
                            <span className='mt10'>
                                <span className='red-txt '>(-)</span>  ₹1000<br />
                                closing balance :50
                            </span>
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

export default connect(mapStateToProps)(TransactionHistory);