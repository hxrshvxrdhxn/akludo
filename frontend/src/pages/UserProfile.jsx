import React, { useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import UserService from '../services/user.service';


function UserProfile(props) {

    const [updateProfile, setUpdateProfile] = useState({ username: '', phone: props.phone, email: '', aadhaar: '' });

    const handler = (e) => {
        console.log(e.target.value)
        setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value })
    }


    const submitProfile = async (e) => {
        e.preventDefault();
        try {
            console.log('Update Profile', updateProfile);
            //let data = await UserService.setUserPassword(props.userId);

            let data = await UserService.getUser()
            console.log(data);
        } catch (c) {
            console.log(c);
        }
    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Profile</h3>
                </div>
                <form onSubmit={submitProfile}>
                    <div className='label-input mt10'><label>Username</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Username' onChange={handler} className='input-white' name='username' />
                        <button className='btn-edit ml10'>EDIT</button>
                    </div>
                    <div className='label-input'><label>Phone</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Phone' onChange={handler} className='input-white' name='phone' disabled value={props.phone} />
                    </div>
                    <div className='label-input'><label>Aadhaar Card</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Aadhaar Card' onChange={handler} className='input-white' name='aadhaar' />
                    </div>
                    <div className='label-input'><label>Email Address</label></div>
                    <div className='small-body section-center'>

                        <input placeholder='Email Address' onChange={handler} className='input-white' name='email' />
                    </div>
                    <div className='text-center mt20'>
                        <button className='btn-green'>UPDATE</button>
                        <br />
                        <br />
                    </div>
                </form>


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