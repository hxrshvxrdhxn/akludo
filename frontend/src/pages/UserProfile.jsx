import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import UserService from '../services/user.service';
import { ToastContainer, toast } from 'react-toastify';
import Profile from '../components/Profile';
import ReferralService from '../services/referral.service';
import ChallengeService from '../services/challenge.service';
import UploadPhoto from '../components/UploadPhoto';
import WalletService from '../services/wallet.service';


function UserProfile(props) {
    const [updateProfile, setUpdateProfile] = useState({ username: '', phone: props.phone ? props.phone : '', email: '', referral: {} });
    const [gamesCount, setgameCount] = useState(0);
    const [user, Setuser] = useState({});
    const [update, setUpdate] = useState(false);
    const [blob, setBlob] = useState();


    const handler = (e) => {
        console.log("handler===================>", e.target.name, !e.target.value)
        setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value })
        setUpdate(e.target.value = true)
        console.log("update--------?", update)

    }
    const blog = (blob) => {
        console.log("this is parent component-", blob);
        setBlob(blob)

        calculateWithdrawableAmount();
    }

    useEffect(() => {
        async function getUserProfile() {
            try {
                let user = await UserService.getUser();
                console.log(user);
                Setuser(user);
                setUpdateProfile({ username: user.name ? user.name : updateProfile.username, phone: user.phones && user.phones.length ? user.phones[0].number : updateProfile.phone, email: user.emails && !!user.emails.length ? user.emails[0].address : updateProfile.email, referral: user.referral ? user.referral : {} });
                let history = await ChallengeService.listAllChallengesByPlayerId(user.id);
                console.log(history);
                setgameCount(history?.length ? history?.length : '0.00')

            } catch (c) {
                toast.error(c.message);
            }
        }
        getUserProfile();
    }, []);



    const submitProfile = async (e) => {
        e.preventDefault();
        try {
            console.log("updateProfile-------------->", updateProfile);
            if (user.id) {
                let data = await UserService.updateUser({ id: user.id, name: updateProfile.username, email: updateProfile.email, picture: { url: blob, storageType: 'REMOTE_URL' } });
                console.log(data);
                toast.success("Updated User Profile")
            }
        } catch (c) {
            toast.error(c.message);
        }
    }

    async function calculateWithdrawableAmount(){
            //FIRST FETCH ALL THE CHALLENGES WINNNIGS IN WHICH CURRENT USER IS 
            ///SUM OF REFERRAL EARNING PLUS EARNINGS IN WALLET 
            let referralearning=0,
            winnings=0;
            console.log("user Earning",user?.wallet?.bal);
            console.log("user Referral",user?.referral);
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
                    <div className='editable-photo'>
                        {(user && user.picture && user.picture.uri) ? <UploadPhoto blog={blog} picture={user.picture.uri} /> : <UploadPhoto blog={blog} />}
                    </div>
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
                    <div className='text-center mt20 pb20'>
                        {update ? <button className='btn-green' type='submit'>UPDATE</button> : ''}
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
                            <div className='mt5 font13'><strong>{gamesCount}</strong></div>
                        </div>
                    </div>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/win-chips.png' alt='Chips Won' /></div>
                        <div className="right-text" >
                            <div className='font13'>Chips Won</div>
                            <div className='mt5 font13'><strong>{updateProfile?.wallet?.earning ? updateProfile?.wallet?.earning : '0.00'}</strong></div>
                        </div>
                    </div>
                </div>
                <div className='heading-equal mt5 mb20'>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/refferal.png' alt='Referrals' /></div>
                        <div className="right-text" >
                            <div className='font13'>Referrals</div>
                            <div className='mt5 font13'><strong>{updateProfile?.referral?.count ? updateProfile?.referral?.count : '0.00'}</strong></div>
                        </div>
                    </div>
                    <div className='img-text-align mt10'>
                        <div className="left-img"> <img src='../images/panelty.png' alt='Referal Money' /></div>
                        <div className="right-text" >
                            <div className='font13'>Referal Money</div>
                            <div className='mt5 font13'><strong>{updateProfile?.referral?.earning ? updateProfile?.referral?.earning : '0.00'}</strong></div>
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