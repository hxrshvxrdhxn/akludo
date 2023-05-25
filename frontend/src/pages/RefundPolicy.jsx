import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';

function RefundPolicy() {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Cancellation/Refund Policy</h3>
                </div>

                <div className='small-body mt10'>
                    <div className='font13 mt10'>Thanks for being a patron with AK ENTERPRISES (referred as “Akludo”). If you are not entirely satisfied with your subscription, we are here to help.</div>
                    <div className='heading mt20'>Refund</div>
                    <div className='font13 mt10'>Once we receive your Refund request, we will inspect it and notify you on the status of your refund.</div>
                    <div className='font13 mt10'>If your refund request is approved, we will initiate a refund to your credit card (or original method of payment) within 3 working days. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</div>
                    <div className='font13 mt10'>In case of unforeseen technical glitch, AK ENTERPRISES would refund subscription upon reviewing the complaint. Final decision lies with the company.</div>
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

export default connect(mapStateToProps)(RefundPolicy);