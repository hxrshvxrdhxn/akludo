import { io } from "socket.io-client";
export const socket = io();
socket.on('connect', () => {
    console.log('---------------------------------------- connected');
    socket.emit('handshake_hello', 'user_id_umar')
});
socket.on('handshake_reply', message => {
    console.log('All setup for user:', message);
});

// if (user && user.id) {
//     const wallt = await WalletService.getWallet();
//     const wallet = wallt[0].bal
//     const userid = { contender: user.id }
//     console.log('challege id', userid)
//     //setChallenge((challenge) => ({ ...challenge, ...userid }));
//     console.log("challenge:--->", challenge)
//     console.log("before openChallenges :---->", { id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null })
//     openChallenges.push({ id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
//     props.dispatch({ type: 'CHALLENGE_OPEN', openChallenges });
//     console.log("after openChallenges Umar------>", openChallenges)
//     let openChallenge = await ChallengeService.listChallengeByStatus('CREATED');
//     setOpenChallenges(openChallenge);
//     props.dispatch({ type: 'ADD_WALLET', wallet });
//     e.target.reset();
// }
//socket.on('challenge', data => console.log("Got a new update....", data));
// function socketsIo(props) {
socket.on("challenge", (challenge) => {
    // socket.emit("event://send-message", JSON.stringify(payload));
    // dispatch(updateChatLog(payload));
    console.log("Got a new update....", challenge)
    const payload = JSON.parse(challenge);
    console.log("Payload a new update....", payload)
    
    //console.log("Payload a new push ....", ({ id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null }))

    //openChallenges.push({ id: challenge.id, challenger: { id: challenge.challenger.id, name: challenge.challenger }, contender: { id: user.id, name: challenge.contender.name }, amount: challenge.amount, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });

    // {"type":"challenge","data":{"_id":"64886b8350c75ab6abcb5464","challenger":"646c62a0461c0c490f5cb57d","amount":50,"game":"64413054d74babfdb353e6b0","roomCode":"213","status":"CREATED","meta":"64886b8350c75ab6abcb5462","createdAt":1686662019531,"updatedAt":1686662019531,"createdBy":"646c62a0461c0c490f5cb57d","updatedBy":"646c62a0461c0c490f5cb57d","__v":0}}
    //payload.push({ id: challenge.id, challenger: { id:challenge.id, name: challenge.name }, contender: { id: '643ce3a3f1aa6f9140a5bbf0', name: 'Umarpahat' }, amount: 200, roomCode: "213", status: "CREATED", game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
    //challenge.push(challenge)
    //props.dispatch({ type: 'CHALLENGE_OPEN', payload.data });
    //console.log("After Got a new update....", challenge)
    // dispatch(updateChatLog(payload));
})
// }
// export default socketsIo