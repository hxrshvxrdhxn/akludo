import React, { useState } from 'react'
import ChallengeService from '../services/challenge.service';
import Profile from './Profile';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../services/user.service';
import { socket } from '../socket';

function ChanllenceList() {
    const [openChallenges, setOpenChallenges] = useState({});
    const [runningChallenges, setRunningChallenges] = useState({});
    const [challenge, setChallenge] = useState({ challenger: "", amount: 0, contender: "", status: '', roomCode: "", game: "" });

    useState(() => {
        async function test() {
            try {
                let user = await UserService.getUser();
                if (user && user.id) {
                    console.log(user.id)
                    const userid = { contender: user.id }
                    setChallenge((challenge) => ({ ...challenge, ...userid }));
                }
                let runChallenge = await ChallengeService.listChallengeByStatus('STARTED');
                setRunningChallenges(runChallenge);
                let openChallenge = await ChallengeService.listChallengeByStatus('CREATED');
                setOpenChallenges(openChallenge);
                console.log(runChallenge, openChallenge)
            } catch (c) {
                console.log(c);
                toast.error(c.message);
                throw new Error(c);
            }
        }
        test();
    }, []);

    async function playGame(item) {
        console.log(item);
        try {
            let data = await ChallengeService.updateStatus(item.id ? item.id : "", "PENDING");
            console.log(data);
            window.location.reload();
        } catch (c) {
            console.log(c);
            toast.error(c.message);
            throw new Error(c);
        }
    }
    const handlerAmount = (e) => {
        setChallenge({ ...challenge, [e.target.name]: parseInt(e.target.value) })
    }
    async function createChallenge(e) {
        e.preventDefault();
        try {
            if (e.target.amount.value <= 0) {
                toast.error('Enter amount');
                return false
            }
            if (e.target.amount.value % 50) {
                toast.error('Enter amount should multiple of ₹50');
                return false
            }
            if (e.target.amount.value > 10000) {
                toast.error('Enter amount should be less then ₹10000');
                return false
            }
            if (e.target.amount.value < 50) {
                toast.error('Please enter amount should be Greater then ₹50');
                return false
            } else {
                let chall = await ChallengeService.createChallenge(challenge);
                e.target.reset();
            }
            //````1===----------- to do list & add all challnges via web socket--==---------=--===------------   
        } catch (c) {
            console.log(c);
            toast.error(c.message);
            throw new Error(c);
        }
    }

    console.log("Umar===========>");

    return (
        <>
            <div className='card'>
                <div className='head-card'>
                    <h3>Create a Challenge</h3>
                </div>
                <form onSubmit={createChallenge}>
                    <div className='body section-center'>
                        <input placeholder='Enter minimum amount ₹50' type='number' className='input-white' name='amount' onChange={handlerAmount} /> <button type='submit' className='btn-green ml10'>SET</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
            <div className='card'>
                <div className='head-card'>
                    <h3>Open Challenge</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className=''>
                    <ul className='challenge-list'>

                        {openChallenges && !!openChallenges.length ? openChallenges.map((item) => {
                            return (<li>
                                <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> {item.contender.name}</div> <div className='green-text'>₹ {item.amount}</div>  <button className='btn-play' onClick={() => { playGame(item) }}>Play</button>
                            </li>)
                        }) : "LOADING"}


                    </ul>

                </div>
            </div>
            <div className='card'>
                <div className='head-card'>
                    <h3>Running Challenge</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className=''>
                    <ul className='challenge-list running'>
                        {(runningChallenges && !!runningChallenges.length) ? runningChallenges.map((item) => {
                            return (<li>
                                <div className='direction'><img className='profile-small' src='../images/profile.png' alt={item.contender.name} /> {item.contender.name}</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ {item.amount}</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt={item.challenger.name} />  {item.challenger.name}</div>
                            </li>)
                        }) : "LOADING"}
                    </ul>

                </div>
            </div>
        </>
    )
}

export default ChanllenceList