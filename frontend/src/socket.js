import { io } from "socket.io-client";

export const socket = io();

socket.on('connect', sock => {
    console.log('---------------------------------------- connected', sock);
});
