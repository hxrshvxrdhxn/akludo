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
                    <div className='heading'>These terms and conditions of use along with privacy policy</div>
                    <div className='font13 mt10'>(“Privacy Policy”) forms a legally binding agreement (“Agreement”) between You and us (AkLudo.com).</div>
                    <div className='font13 mt10'>Hence, We insist that You read these Terms and Privacy Policy and let Us know if You have any questions regarding the same. We will try Our best to answer Your queries.</div>
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