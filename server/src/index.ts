import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})
server.listen(3001, () => {
    console.log('server running...')
})

let noOfUsers = 0
io.on('connect', (socket) => {
    console.log(`new connection: ${socket.id}`)
    // potentially add modulo or find other way to keep track of all
    noOfUsers++
    console.log(`number of users connected: ${noOfUsers}`)

    const socketRoomNumber = ~~((noOfUsers - 1) / 2)
    const socketRoom = `room_${socketRoomNumber}`
    void socket.join(socketRoom)

    if (noOfUsers % 2 === 1) {
        console.log(`first player joined room ${socketRoomNumber}`)
    } else {
        console.log(`second player joined room ${socketRoomNumber}`)
        socket.to(socketRoom).emit('player_joined')
    }

    socket.on('send_init_state', (initBoard) => {
        socket.to(socketRoom).emit('receive_init_state', initBoard)
    })

    socket.on('send_move', (diceBoard) => {
        socket.to(socketRoom).emit('receive_move', diceBoard)
    })

    socket.on('disconnect', () => {
        console.log(`disconnected: ${socket.id}`)
        noOfUsers--
        console.log(`number of users connected: ${noOfUsers}`)
        socket.to(socketRoom).emit('player_disconnecting')
    })
})