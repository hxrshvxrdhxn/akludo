import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const handleClick = (e) => {
    console.log('this is:', e);
};
function Cash(props) {

    return (
        <div className='cash-box'>
            <Link className='wallet-txt' to='/deposit'> {props.amount}</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        amount: state.amount
    };
}

export default connect(mapStateToProps)(Cash);

