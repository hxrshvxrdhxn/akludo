import { io } from "socket.io-client";
export const socket = io();
socket.on('connect', () => {
    console.log('---------------------------------------- connected');
    socket.emit('handshake_hello', 'user_id_umar')
});
socket.on('handshake_reply', message => {
    console.log('All setup for user:', message);
});

socket.on("challenge", (challenge) => {
    console.log("Got a new update....", challenge)
    const payload = JSON.parse(challenge);
    console.log("Payload a new update....", payload)

})
