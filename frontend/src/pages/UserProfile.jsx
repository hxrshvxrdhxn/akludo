import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import UserService from '../services/user.service';
import { ToastContainer, toast } from 'react-toastify';
import Profile from '../components/Profile';
import ReferralService from '../services/referral.service';


function UserProfile(props) {

    const [updateProfile, setUpdateProfile] = useState({ username: '', phone: props.phone ? props.phone : '', email: '',referral:{} });
    const [user, Setuser] = useState({});
    const handler = (e) => {
        console.log(e.target.value)
        setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        async function test() {
            try {
                let user = await UserService.getUser();
                console.log(user);
                Setuser(user);
                setUpdateProfile({ username: user.name ? user.name : updateProfile.username, phone: user.phones && user.phones.length ? user.phones[0].number : updateProfile.phone, email: user.emails && !!user.emails.length ? user.emails[0].address : updateProfile.email, referral:user.referral?user.referral:{} });
            } catch (c) {
                console.log(c);
                toast.error(c.message);
                throw new Error(c)
            }
        }
        test();
    }, []);


    const submitProfile = async (e) => {
        e.preventDefault();
        try {
            console.log(updateProfile);
            if (user.id) {
                let data = await UserService.updateUser({ id: user.id, name: updateProfile.username,email:updateProfile.email });   
                console.log(data);
                toast.error("user updated")
            }
        } catch (c) {
            console.log(c);
            toast.error(c.message);
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
                <ToastContainer />
                <form onSubmit={submitProfile}>
                    <Profile></Profile>
                    <div className='label-input mt10'><label>Username</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Username' onChange={handler} className='input-white' name='username' value={updateProfile.username} />
                    </div>
                    <div className='label-input'><label>Phone</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Phone' onChange={handler} className='input-white' name='phone' disabled value={updateProfile.phone} />
                    </div>
                    <div className='label-input'><label>Email Address</label></div>
                    <div className='small-body section-center'>

                        <input placeholder='Email Address' onChange={handler} className='input-white' name='email' value={updateProfile.email} />
                    </div>
                    <div className='text-center mt20'>
                        <button className='btn-green' type='submit'>UPDATE</button>
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
                            <div className='mt5 font13'><strong>{updateProfile.referral&&updateProfile.referral.earning?updateProfile.referral.earning:'unable to fetch'}</strong></div>
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
        phone: state.phone,
        userId: state.userId
    };
}

export default connect(mapStateToProps)(UserProfile);