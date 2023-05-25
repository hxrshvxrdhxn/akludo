import React, { useState, useEffect } from 'react'
import ChallengeService from '../services/challenge.service';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../services/user.service';
import { socket } from '../socket';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from 'react-router-dom';

function ChanllenceList(props) {
    const navigate = useNavigate();
    const [openChallenges, setOpenChallenges] = useState([]);
    const [runningChallenges, setRunningChallenges] = useState([]);
    const [challenge, setChallenge] = useState({ challenger: "", amount: 0, contender: "", status: '', roomCode: "", game: "" });
    useEffect(() => {
        async function test() {
            try {
                let user = await UserService.getUser();
                if (user && user.id) {
                    console.log(user.id)
                    const userid = { challenger: user.id }
                    console.log('challenger id', userid)
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
    }, [socket]);

    async function playGame(item) {
        console.log("Item umar ==>",item);
        try {
            let data = await ChallengeService.updateStatus(item.id ? item.id : "", "PENDING");
            console.log("Data umar-------->>>>>",data);
        } catch (c) {
            console.log("Umar:  ",c);
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
                await ChallengeService.createChallenge(challenge);
                let user = await UserService.getUser();
                if (user && user.id) {
                    console.log(user.id)
                    const userid = { contender: user.id }
                    console.log('challege id', userid)
                    //setChallenge((challenge) => ({ ...challenge, ...userid }));
                    console.log("challenge:--->", challenge)
                    console.log("before openChallenges :---->", { id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null })
                    openChallenges.push({ id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
                    props.dispatch({ type: 'CHALLENGE_OPEN', openChallenges });
                    console.log("after openChallenges------>", openChallenges)
                    let openChallenge = await ChallengeService.listChallengeByStatus('CREATED');
                    setOpenChallenges(openChallenge);
                    e.target.reset();
                }
            }
            //````1===----------- to do list & add all challnges via web socket--==---------=--===------------   
        } catch (c) {
            console.log(c);
            toast.error(c.message.split(':')[1]);
            throw new Error(c);
        }
    }

    const AddToMoney = () => {
        navigate('/deposit', { replace: true });
    }

    // useEffect(() => {
    //     async function umar(e) {
    //         e.preventDefault();
    //         await ChallengeService.umar(challenge);
    //         socket.on("challenge", (openChallenges) => {
    //             console.log("Umar Socket before")
    //             //openChallenges.push({ id: "644a6951afb67ba1239cac94", challenger: { id: '643e502e746d5ecbaa4936dd', name: '8743911233' }, contender: { id: '643ce3a3f1aa6f9140a5bbf0', name: 'Umarpahat' }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
    //             props.dispatch({ type: 'CHALLENGE_OPEN', openChallenges });
    //             console.log("inner Update Socket before", openChallenges)

    //             console.log("Umar Socket after")
    //         });
    //     }

    // }, [socket])
    const ChallegeListItem = ({ item }) => (<>
        <div> <img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} /> {item?.challenger?.name}</div> <div className='green-text'>₹ {item?.amount}</div>
        <Popup trigger={<button className='btn-play' onClick={() => { playGame(item) }}> Play </button>} modal>
            {close => (<div className="modal">
                <div className="content text-center">
                    <br /><br />
                    <h2>Insufficient balance </h2>
                    <br /><br /><br /><br />
                </div>
                <div className="actions">
                <button
                        className="button btn-green"
                        onClick={() => {
                            console.log('ok ');
                           
                        }}
                    >
                        Close
                    </button>  &nbsp;
                    <button
                        className="button btn-green"
                        onClick={() => {
                            console.log('modal closed ');
                            close();
                        }}
                    >
                        Close
                    </button> &nbsp;
                    <button
                        className="button btn-green"
                        onClick={AddToMoney}
                    >
                        Add Money
                    </button>
                    <br /><br />
                </div>
            </div>)}
        </Popup>
    </>)

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

                        {openChallenges && !!openChallenges.length ? openChallenges?.slice(0).reverse().map((item, i) => {
                            return (<li key={i} className='newItem'>
                                <ChallegeListItem item={item} />
                            </li>)
                        }) : <div className='text-center white-bg padding20'>Hooray, no Challenge here!</div>}

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
                        {(runningChallenges && !!runningChallenges.length) ? runningChallenges?.map((item) => {
                            return (<li key={item?.id}>
                                <div className='direction'><img className='profile-small' src='../images/profile.png' alt={item?.contender?.name} /> {item?.contender?.name}</div> <div className='green-text direction'><img src='../images/vs.png' alt='vice-versa' /> ₹ {item?.amount}</div>  <div className='direction'> <img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} />  {item?.challenger?.name}</div>
                            </li>)
                        }) : <div className='text-center white-bg padding20'>Hooray, no Running Challenge here!</div>}
                    </ul>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        challenge: state.challenge,
        openChallenges: state.openChallenges
    };
}

export default connect(mapStateToProps)(ChanllenceList);