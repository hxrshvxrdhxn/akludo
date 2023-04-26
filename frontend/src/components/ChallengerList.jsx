import React, { useState } from 'react'
import ChallengeService from '../services/challenge.service';
import Profile from './Profile';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../services/user.service';
import { socket } from '../socket';

function ChanllenceList() {
    const [amount, setAmount]=useState()
    const [openChallenges,setOpenChallenges]=useState({});
    const [runningChallenges,setRunningChallenges]=useState({});
    const [challenge,setChallenge]=useState({challenger:"", amount:0, contender:"", status:'', roomCode:"", game:"" });

    useState(()=>{
      async function test(){
        try{
            let user=await UserService.getUser();
            if(user&&user.id){
                console.log(user.id)
                const userid={contender:user.id}
                setChallenge((challenge)=>({...challenge,...userid}));
            }
            let runChallenge=await ChallengeService.listChallengeByStatus('STARTED');
            setRunningChallenges(runChallenge);
            let openChallenge=await ChallengeService.listChallengeByStatus('CREATED');
            setOpenChallenges(openChallenge);
            console.log(runChallenge,openChallenge)
        }catch(c){
            console.log(c);
            toast.error(c.message);
            throw new Error(c);
        }
      }
      test();
    },[]);

    async function createChallenge(){       
        try{
            console.log(challenge);
            let chall=await ChallengeService.createChallenge(challenge);
            console.log("chall======>",chall);
//````1===----------- to do list & add all challnges via web socket--==---------=--===------------   
        }catch(c){
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
                <div className='body section-center'>
                    <input placeholder='Amount' className='input-white' name='amount' onChange={(e)=>{let amount={amount:e.target.value}; setChallenge((challenge)=>({...challenge,...amount}))}} value={challenge.amount}/> <button onClick={createChallenge}  className='btn-green ml10'>SET</button>
                </div>
            </div>
            <ToastContainer />
            <div className='card'>
                <div className='head-card'>
                    <h3>Open Challenge</h3>
                    <div className='view-all'><a href=''>View All</a></div>
                </div>
                <div className=''>
                    <ul className='challenge-list'>
                        
                            {openChallenges&&!!openChallenges.length?openChallenges.map((item)=>{
                            return(<li>
                            <div> <img className='profile-small' src='../images/profile.png' alt='Sunil Kumar' /> {item.contender.name}</div> <div className='green-text'>₹ {item.amount}</div>  <button className='btn-play'>Play</button>
                            </li>)
                            }):"LOADING"}
                       
                       
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
                            return (<li key={item.contender.id}>
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