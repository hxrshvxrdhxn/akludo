import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ChallengeService from '../services/challenge.service';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../services/user.service';
import { socket } from '../socket';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from 'react-router-dom';
import WalletService from '../services/wallet.service';

function GameListing(props) {
    const navigate = useNavigate();
    const [openChallenges, setOpenChallenges] = useState([]);
    const [runningChallenges, setRunningChallenges] = useState([]);
    const [challenge, setChallenge] = useState({ challenger: "", amount: 0, contender: "", status: '', roomCode: "", game: "" });
    const [currentUser, setCurrentUser] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function test() {
            try {
                let user = await UserService.getUser();
                if (user && user.id) {
                    setCurrentUser(user.id)
                    setUser(user)
                    const userid = { challenger: user.id }
                    console.log('challenger id', userid)
                    setChallenge((challenge) => ({ ...challenge, ...userid }));
                }
                let runChallenge = await ChallengeService.listChallengeByStatus('STARTED');
                setRunningChallenges(runChallenge);
                let openChallenge = await ChallengeService.listChallengeByStatus('CREATED');
                setOpenChallenges(openChallenge);
                console.log("runChallenge==========>", runChallenge)
                console.log("openChallenge============>", openChallenge)
            } catch (c) {
                console.log(c);
                toast.error(c.message);
                throw new Error(c);
            }
        }
        test();
    }, []);

    async function playGameStart(item) {
        try {
            console.log(challenge.amount)
            // let data = await ChallengeService.updateStatus(item.id ? item.id : "", "PENDING");

        } catch (c) {
            toast.error(c.message.split(':')[1]);
        }
    }

    async function playGameReject(item) {
        try {
            console.log(currentUser)
            // let data = await ChallengeService.updateStatus(item.id ? item.id : "", "PENDING");

        } catch (c) {
            toast.error(c.message.split(':')[1]);
        }
    }

    async function playGame(item) {
        try {


            if (item.amount <= user.wallet.bal) {
                console.log("Item------->", item)
                console.log("openChallenges ------->", openChallenges)
                console.log("Play Game ----->", ({ id: item.id, challenger: { id: item.challenger.id, name: item.challenger }, contender: { id: user.id, name: user.name }, amount: item.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null }))
                // let data = await ChallengeService.updateStatus(item.id ? item.id : "", "PENDING");
            }


        } catch (c) {
            toast.error(c.message.split(':')[1]);
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
                    const wallt = await WalletService.getWallet();
                    const wallet = wallt[0].bal
                    const userid = { contender: user.id }
                    console.log('challege id', userid)
                    //setChallenge((challenge) => ({ ...challenge, ...userid }));
                    console.log("challenge:--->", challenge)
                    console.log("before openChallenges :---->", { id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null })
                    openChallenges.push({ id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
                    props.dispatch({ type: 'CHALLENGE_OPEN', openChallenges });
                    console.log("after openChallenges Umar------>", openChallenges)
                    let openChallenge = await ChallengeService.listChallengeByStatus('CREATED');
                    setOpenChallenges(openChallenge);
                    props.dispatch({ type: 'ADD_WALLET', wallet });
                    e.target.reset();
                }
            }
            //````1===----------- to do list & add all challnges via web socket--==---------=--===------------   
        } catch (c) {
            toast.error(c.message.split(':')[1]);
        }
    }

    const AddToMoney = () => {
        navigate('/deposit', { replace: true });
    }

    const ChallegeListItem = ({ item, currentUser }) => (
        <>
            {(item.challenger.id === currentUser) ?
                <>



                    <div className='userListTop'>
                        <div> <img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} /> {item?.challenger?.name}</div>
                        <div className='green-text'>₹ {item?.amount}</div>
                        { }
                        <div className='widthBtn100 userlistEnd'> Waiting... <img className='profile-small' src='../images/loading-buffering.gif' /> </div>
                        {/* <div><img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} /> {item?.challenger?.name}</div> */}
                    </div>

                    {/* <div className='userListTop userlistEnd'>
                        <div>Connecting...</div> <button className='btn-play-samll' onClick={() => { playGameStart(item) }}> Start  </button>
                        <button className='btn-play-samll btn-play-samll-red' onClick={() => { playGameReject(item) }}> Reject  </button>
                    </div> */}
                </> :

                <>
                    <div><img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} /> {item?.challenger?.name}</div>
                    <div className='green-text'>₹ {item?.amount}</div>

                    <Popup trigger={<div className='widthBtn100'><button className='btn-play' onClick={() => { playGame(item) }}> Play </button></div>} modal>
                        {close => (<div className="modal">
                            <div className="content text-center">
                                <br /><br />
                                {(item.amount <= user.wallet.bal) ? <h2>Please copy room code</h2> :
                                    <h2>Low Balance for this challege. </h2>
                                }
                                <br /><br /><br />
                                {(item.amount <= user.wallet.bal) ? <input
                                    className="input-white"
                                    placeholder='Copy room code'
                                    value={item.roomCode}
                                /> : ''}
                                <br /><br />
                            </div>
                            <div className="actions">
                                <button
                                    className="button btn-green error"
                                    onClick={() => {
                                        console.log('modal closed ');
                                        close();
                                    }} >
                                    Close
                                </button>

                                {(item.amount <= user.wallet.bal) ? <button
                                    className="button btn-green ml5"
                                    onClick={() => {
                                        console.log('Copy Room Code ');

                                    }}>
                                    Copy Room Code
                                </button> : ''}

                                {(item.amount <= user.wallet.bal) ? '' :
                                    <button
                                        className="button btn-green ml5"
                                        onClick={AddToMoney}>
                                        Add Money
                                    </button>}
                                <br /><br />
                            </div>
                        </div>)}
                    </Popup>
                </>
            }
        </>
    )
    return (
        <>
            <Header />
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

                        {openChallenges && !!openChallenges.length ? openChallenges?.slice(0).reverse().filter((currentUser) => currentUser.challenger.id !== currentUser).map((item, i) => {
                            return (<li key={i}>
                                <ChallegeListItem item={item} currentUser={currentUser} />
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
        wallet: state.wallet,
        openChallenges: state.openChallenges
    };
}

export default connect(mapStateToProps)(GameListing);