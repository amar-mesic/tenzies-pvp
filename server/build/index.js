"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
server.listen(3001, () => {
    console.log('server running...');
});
let noOfUsers = 0;
io.on('connect', (socket) => {
    console.log(`new connection: ${socket.id}`);
    // potentially add modulo or find other way to keep track of all
    noOfUsers++;
    console.log(`number of users connected: ${noOfUsers}`);
    const socketRoomNumber = ~~((noOfUsers - 1) / 2);
    const socketRoom = `room_${socketRoomNumber}`;
    void socket.join(socketRoom);
    if (noOfUsers % 2 === 1) {
        console.log(`first player joined room ${socketRoomNumber}`);
    }
    else {
        console.log(`second player joined room ${socketRoomNumber}`);
        socket.to(socketRoom).emit('player_joined');
    }
    socket.on('send_init_state', (initBoard) => {
        socket.to(socketRoom).emit('receive_init_state', initBoard);
    });
    socket.on('send_move', (diceBoard) => {
        socket.to(socketRoom).emit('receive_move', diceBoard);
    });
    socket.on('disconnect', () => {
        console.log(`disconnected: ${socket.id}`);
        noOfUsers--;
        console.log(`number of users connected: ${noOfUsers}`);
        socket.to(socketRoom).emit('player_disconnecting');
    });
});
