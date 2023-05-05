import { io } from "socket.io-client";
export const socket = io();
socket.on('connect', () => {
    console.log('---------------------------------------- connected');
    socket.emit('handshake_hello', 'user_id_umar')
});
socket.on('handshake_reply', message => {
    console.log('All setup for user:', message);
});
//socket.on('challenge', data => console.log("Got a new update....", data));
// function socketsIo(props) {
socket.on("challenge", (challenge) => {
    // socket.emit("event://send-message", JSON.stringify(payload));
    // dispatch(updateChatLog(payload));
    console.log("Got a new update....", challenge)
    // const payload = JSON.parse(challenge);
    // console.log("Payload a new update....", payload)
    // payload.push({ id: "644a6951afb67ba1239cac94", challenger: { id: '643e502e746d5ecbaa4936b8', name: '8743911233' }, contender: { id: '643ce3a3f1aa6f9140a5bbf0', name: 'Umarpahat' },  amount: 200, roomCode: "213", status: "CREATED",game: { id: '64413054d74babfdb353e6b0', name: 'Ludo-Test' }, winner: null });
    // challenge.push(challenge)
    //props.dispatch({ type: 'CHALLENGE_OPEN', payload });
    // console.log("After Got a new update....", challenge)
    // dispatch(updateChatLog(payload));
})
// }
// export default socketsIo