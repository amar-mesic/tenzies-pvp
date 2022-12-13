import './App.css'
import Main from './components/Main'
import io from 'socket.io-client'
import { useEffect } from 'react'
import Footer from './components/Footer'

const NO_OF_DICE = 10
/**
 * Handle as much of the socket logic in the app as possible.
 * Due to the need to communicate state, some of the socket work is done in Main.
 */
const socket = io('http://54.243.86.231:3001')

function App() {
    /**
     * Run effectful code only once after rendering, since dependency array is empty.
     * Add socket handlings for the different events.
     */
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
            <section className="container">
                <Main noOfDice={NO_OF_DICE} socket={socket} />
            </section>
            <Footer />
        </div>
    )
}

export default App
