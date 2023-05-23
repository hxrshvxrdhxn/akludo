import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';

function Support(props) {
    return (
        <>
            <Header />
            
            <div className='card'>
                <div className='head-card'>
                    <h3>Support</h3>
                </div>
                <div className=''>
                     <img width="100%" src='../images/support-us.png' alt='Support' />
                </div>
                <div className='img-text-align mt10'>
                    <div className="left-img"> <img height="50" src='../images/whats-icon.png' alt='WhatsApp' /></div>
                    <div className="right-text" >
                        <div className='font13'>WhatsApp NO: <strong>85294 43408</strong></div>
                        <div className='green-txt mt5'>Please drop a message on WhatsApp</div>
                    </div>
                </div>

                <div className='img-text-align'>
                    <div className="left-img"> <img height="50" src='../images/email-icon.png' alt='Net Banking' /></div>
                    <div className="right-text" >
                        <div className='font13'><a className='black-text' href='mailto:care@akludo.com'>care@akludo.com</a></div>
                        <div className='green-txt mt5'>Please drop a mail on our email address</div>
                    </div>
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

export default connect(mapStateToProps)(Support);