import React, { useState, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import ChallengeService from '../services/challenge.service';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../services/user.service';
import { socket } from '../socket';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import WalletService from '../services/wallet.service';

function GameListing(props) {
    const navigate = useNavigate();
    const [openChallenges, setOpenChallenges] = useState([]);
    const [runningChallenges, setRunningChallenges] = useState([]);
    const [challenge, setChallenge] = useState({ challenger: "", amount: 0, contender: "", status: '', roomCode: "", game: "" });
    const [currentUser, setCurrentUser] = useState([]);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [wallet, setWallet] = useState();

    useEffect(() => {
        async function test() {
            try {
                let user = await UserService.getUser();
                // const wallt = await WalletService.getWallet();
                const wallet1 = user?.wallet?.bal
                setWallet(wallet1);
                console.log("wallet  ============>", user.wallet.bal, wallet)
                if (user && user.id) {
                    setCurrentUser(user.id)
                    setUser(user)
                    const userid = { challenger: user.id }
                    console.log('challenger id', userid)
                    setChallenge((challenge) => ({ ...challenge, ...userid }));
                }
                let runChallenge = await ChallengeService.listChallengeByStatus(['STARTED']);
                setRunningChallenges(runChallenge);
                let openChallenge = await ChallengeService.listChallengeByStatus(['CREATED', 'PENDING']);
                setOpenChallenges(openChallenge);
                console.log("runChallenge=============>", runChallenge);
                console.log("openChallenge============>", openChallenge);
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
            //on game start change the status from pending to started
            let resStatus = await ChallengeService.update({ id: item?.id || null, status: "STARTED" });
            console.log(resStatus);
        } catch (c) {
            toast.error(c.message.split(':')[1]);
        }
    }

    async function playGameReject(item) {
        try {
            console.log(currentUser)
            //on reject change challenge status from pending to rejeted and change the contender to nil ===to do
            let resStatus = await ChallengeService.update({ id: item?.id || null, status: "CREATED" });
            console.log(resStatus);
        } catch (c) {
            toast.error(c.message.split(':')[1]);
        }
    }

    async function playGame(item) {
        try {
            if (user?.wallet?.bal >= item?.amount) {
                let challenge = await ChallengeService.update({ id: item?.id || null, contender: user.id || null, status: "PENDING" });
                console.log("challenge update on--------->", challenge);
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
                let newchall = await ChallengeService.createChallenge(challenge);
                console.log("new ==", newchall);
                let user = await UserService.getUser();
                if (user && user.id) {
                    const wallt = await WalletService.getWallet();
                    const wallet = wallt[0].bal;
                    console.log("before openChallenges :---->", { id: newchall?.id, challenger: { id: challenge.challenger, name: newchall?.challenger?.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null })
                    openChallenges.push({ id: newchall?.id, challenger: { id: challenge.challenger, name: newchall?.challenger?.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
                    props.dispatch({ type: 'CHALLENGE_OPEN', openChallenges });
                    console.log("after openChallenges Umar------>", openChallenges)
                    let openChallenge = await ChallengeService.listChallengeByStatus(['CREATED', 'PENDING']);
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
            {(item?.challenger?.id === currentUser) ?
                <>
                    <div className='userListTop'>
                        <div> <img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} /> {item?.challenger?.name}</div>
                        <div className='green-text'>₹ {item?.amount}</div>
                        {item?.status !== 'PENDING' ? (<div className='widthBtn100 userlistEnd'> Waiting...<img className='profile-small' src='../images/loading-buffering.gif' /> </div>) : (<div><img className='profile-small' src='../images/profile.png' alt={item?.contender?.name} /> {item?.contender?.name}</div>)}
                    </div>
                    {item?.status === 'PENDING' ? (
                        <>
                            <div className='userListTop userlistEnd'>
                                <div>Connecting...</div> <button className='btn-play-samll' onClick={() => { playGameStart(item) }}> Start  </button>
                                <button className='btn-play-samll btn-play-samll-red' onClick={() => { playGameReject(item) }}> Reject  </button>
                            </div></>) : ''
                    }
                </> :

                <>
                    <div><img className='profile-small' src='../images/profile.png' alt={item?.challenger?.name} /> {item?.challenger?.name}</div>
                    <div className='green-text'>₹ {item?.amount}</div>
                    {item?.status != 'PENDING' ? (<> {(item?.amount <= user.wallet.bal) ? <Popup trigger={<div className='widthBtn100'><button className='btn-play' onClick={() => { playGame(item) }}> Play </button></div>} modal>
                        {close => (<div className="modal">
                            <div className="content text-center">
                                <br /><br />
                                {(item?.amount <= user.wallet.bal) ? <input
                                    className="input-white"
                                    id='roomcode'
                                    name='roomcode'
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
                                <button className="button btn-green ml5" onClick={() => {
                                    navigator.clipboard.writeText(item.roomCode);
                                }}>Copy</button>

                                <br /><br />
                            </div>
                        </div>)}
                    </Popup> : <Popup
                        trigger={<button className="btn-play-samll btn-play-samll-red"> Low Balance </button>}
                        position="top right"
                        on={['click']}
                        arrow={'center center'}
                    >
                        <span className='font13'>
                            Your wallet chips less then this challenge. Could add chips in your wallet.
                            <br />
                            <button className="button btn-green mt10" onClick={AddToMoney}>Add Chips </button>
                        </span>
                    </Popup>}</>) :
                        (
                            <div className='widthBtn100 userlistEnd'> Waiting... <img className='profile-small' src='../images/loading-buffering.gif' /> </div>
                        )
                    }
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

                        {openChallenges && !!openChallenges?.length ? openChallenges?.slice(0).reverse().map((item, i) => {
                            return (
                                <li key={i}>
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
                        {(runningChallenges && !!runningChallenges?.length) ? runningChallenges?.map((item) => {
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