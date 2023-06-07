import React, { useState } from 'react'
import { connect } from 'react-redux';
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import Login from '../services/login.service';
import { ToastContainer, toast } from 'react-toastify';
import { encrypt, decrypt, compare } from 'n-krypta'; 

function NewPassword(props) {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });


    const handler = (e) => {
        const secret = 'Secret'; // secret key for encryption
        const passwordsecret = e.target.value
        const onlyDigits =  encrypt(passwordsecret, secret);
        setNewPassword({ ...newPassword, [e.target.name]: onlyDigits })
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            /// TO DO PASSWORD CONFIRM PASSWORD SHOULD BE SAME=====-done
            if(newPassword.password&&newPassword.password===newPassword.confirmPassword){
                const user=await UserService.getUser();
                let data = await UserService.setUserPassword(user.id,newPassword.password);
                console.log(data);
                if(data&&!!data.phones.length){
                    let logindata = await Login.login(data.phones[0].number,newPassword.password);
                    console.log(logindata);
                }
                navigate('/', { replace: true });
            }else{
                toast.error("passsword and confirm password should be same and filled")
            }
        } catch (c) {
            console.log(c);
            toast.error(c);
        }





    }

    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>Set New Password</h3>
                </div>
                <ToastContainer />
                <form onSubmit={submitForm}>
                    <div className='label-input mt10'><label>New Password</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Must be at least 8 characters.' type="password" onChange={handler} className='input-white' name='password' />
                    </div>
                    <div className='label-input'><label>Confirm Password</label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Confirm Password' type="password" onChange={handler} className='input-white' name='confirmPassword' />
                    </div>
                    <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='submit'>Set Password</button>
                    </div>
                </form>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        userId: state.userId
    };
}

export default connect(mapStateToProps)(NewPassword);
