import axios from 'axios'
import React, { useState } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { addData } from '../store/action';

function Otp(props) {
    const [phone, setPhone] = useState();
    const [error, setError] = useState();

    const handler = (e) => {
        console.log(e.target.value)

    }

    // function submitRegister() {
    //     axios.post("https://jsonplaceholder.typicode.com/posts", { phone: phone })
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    // const handleContinue = (event) => {
    //     event.preventDefault();
    //     /^[6-9]\d{9}$/.test(phone)
    //         ? submitRegister()
    //         : setError("Please enter valid 10 digit mobile number");
    // };


    return (
        <>
            <Header />
            <div className='card'>
                <div className='head-card'>
                    <h3>OTP Sent On</h3>
                    <button onClick={addData}>Add Data</button>
                </div>
                <form>
                    <div className='label-input'><label>Otp  <b>{props.salary}</b></label></div>
                    <div className='small-body section-center'>
                        <input placeholder='Enter Otp' onChange={handler} className='input-white' name='otp' />
                    </div>
                    {/* <div className='text-center mt20 mb20'>
                        <button className='btn-green' type='button' onClick={handleContinue}>Continue</button>
                    </div> */}

                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({ data: state.data })

const mapDispatchToProps = (dispatch) => {
    return {
        addData: () => dispatch(addData)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Otp);