import './App.css'
import Main from './components/Main'
import io from 'socket.io-client'
import { useEffect } from 'react'

const NO_OF_DICE = 10
const socket = io('http://localhost:3001')

function App() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('first_player', () => {
            // an event was received from the server
            console.log('I am the first player!')
        })

        // upon disconnection
        socket.on('disconnect', (reason) => {
            console.log(`disconnected due to ${reason}`)
        })
    }, [])

    return (
        <div className="App">
            <Main noOfDice={NO_OF_DICE} socket={socket} />
        </div>
    )
}

export default App
