import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';


function UserProfile(props) {
    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Profile</h3>
                </div>
                <div className='label-input mt10'><label>Username</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Username' className='input-white' name='amount' />
                    <button className='btn-edit ml10'>EDIT</button>
                </div>
                <div className='label-input'><label>Phone</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Phone' className='input-white' name='phone' value={props.phone} />
                </div>
                <div className='label-input'><label>Aadhaar Card</label></div>
                <div className='small-body section-center'>
                    <input placeholder='Aadhaar Card' className='input-white' name='amount' />
                </div>
                <div className='label-input'><label>Email Address</label></div>
                <div className='small-body section-center'>

                    <input placeholder='Email Address' className='input-white' name='amount' />
                </div>
                <div className='text-center mt20'>
                    <button className='btn-green'>UPDATE</button>
                    <br />
                    <br />
                </div>


            </div>
            <div className='card'>
                <div className='head-card'>
                    <h3>Metrics</h3>
                </div>
                <div className='heading-equal mt5 mb20'>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/played.png' alt='Games Played' /></div>
                        <div className="right-text" >
                            <div className='font13'>Games Played</div>
                            <div className='mt5 font13'><strong>0.00</strong></div>
                        </div>
                    </div>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/win-chips.png' alt='Games Played' /></div>
                        <div className="right-text" >
                            <div className='font13'>Chips Won</div>
                            <div className='mt5 font13'><strong>0.00</strong></div>
                        </div>
                    </div>
                </div>
                <div className='heading-equal mt5 mb20'>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/refferal.png' alt='Games Played' /></div>
                        <div className="right-text" >
                            <div className='font13'>Referral Earning</div>
                            <div className='mt5 font13'><strong>0.00</strong></div>
                        </div>
                    </div>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/panelty.png' alt='Games Played' /></div>
                        <div className="right-text" >
                            <div className='font13'>Penalty</div>
                            <div className='mt5 font13'><strong>0.00</strong></div>
                        </div>
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

export default connect(mapStateToProps)(UserProfile);