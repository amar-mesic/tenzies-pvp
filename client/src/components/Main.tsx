import { nanoid } from 'nanoid'
import React, { SyntheticEvent } from 'react'
import Confetti from 'react-confetti'
import { DieState } from '../states/ComponentState'
import '../style/main.css'
import DiceBoard from './DiceBoard'
import Loader from './Loader'

type MainProps = {
    noOfDice: number
    socket: any
}

export type DiceBoardState = {
    dieStates: DieState[]
    completed: boolean
    rolling: boolean
}

export type MainState = {
    diceBoard: DiceBoardState
    oppState: DiceBoardState
    oppReady: boolean
}
export default class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props)

        this.state = this.defaultState(props)

        this.handleFreeze = this.handleFreeze.bind(this)
        this.handleRoll = this.handleRoll.bind(this)
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
        this.checkDone = this.checkDone.bind(this)
        this.reset = this.reset.bind(this)
    }

    componentDidMount() {
        setInterval(() => {
            console.log(`dice rolling: ${this.state.diceBoard.rolling}`)
        }, 5000)

        const { socket } = this.props

        socket.on('player_joined', () => {
            socket.emit('send_init_state', this.state.diceBoard)
        })

        socket.on('receive_init_state', (initState: DiceBoardState) => {
            if (!this.state.oppReady) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        oppReady: true,
                        oppState: initState,
                    }
                })

                socket.emit('send_init_state', this.state.diceBoard)
            }
        })

        socket.on('receive_move', (opponentBoard: DiceBoardState) => {
            this.setState(
                (prevState) => {
                    return {
                        ...prevState,
                        oppState: opponentBoard,
                    }
                },
                () => {
                    console.log('move received')
                    if (this.state.oppState.completed) console.log('game lost')
                },
            )
        })

        socket.on('player_disconnecting', () => {
            this.setState((prevState) => ({
                ...prevState,
                oppReady: false,
            }))
        })
    }

    defaultState(props: MainProps): MainState {
        const myDiceBoard = {
            dieStates: new Array<DieState>(props.noOfDice)
                .fill({
                    id: '',
                    value: Math.ceil(Math.random() * 6),
                    isFrozen: false,
                })
                .map((_) => ({
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isFrozen: false,
                })),
            completed: false,
            rolling: false,
        } as DiceBoardState

        return {
            diceBoard: myDiceBoard,
            oppReady: false,
            oppState: {
                dieStates: [],
                completed: false,
                rolling: false,
            },
        }
    }

    handleFreeze(e: SyntheticEvent, id: string) {
        e.preventDefault()
        this.setState(
            (prevState: MainState) => {
                const newDieStates = prevState.diceBoard.dieStates.map(
                    (dieState) =>
                        id !== dieState.id
                            ? dieState
                            : {
                                  ...dieState,
                                  isFrozen: !dieState.isFrozen,
                              },
                )
                const newState = {
                    ...prevState,
                    diceBoard: {
                        ...prevState.diceBoard,
                        dieStates: newDieStates,
                    },
                }
                return newState
            },
            () => {
                this.props.socket.emit('send_move', this.state.diceBoard)
                this.checkDone()
            },
        )
    }

    checkDone() {
        const completed = this.state.diceBoard.dieStates.every(
            (dieState) =>
                dieState.isFrozen &&
                this.state.diceBoard.dieStates[0].value === dieState.value,
        )

        if (completed)
            this.setState(
                (prevState) => ({
                    ...prevState,
                    diceBoard: {
                        ...prevState.diceBoard,
                        completed: true,
                    },
                }),
                () => this.props.socket.emit('send_move', this.state.diceBoard),
            )
    }

    handleRoll() {
        this.setState(
            (prevState: MainState) => ({
                ...prevState,
                diceBoard: {
                    ...prevState.diceBoard,
                    dieStates: prevState.diceBoard.dieStates.map((dieState) =>
                        dieState.isFrozen
                            ? dieState
                            : {
                                  ...dieState,
                                  // TODO: fix number generation when dice spin
                                  value: Math.ceil(Math.random() * 6),
                              },
                    ),
                    rolling: true,
                },
            }),
            () => {
                this.props.socket.emit('send_move', this.state.diceBoard)

                console.log(
                    `button pressed. Dice rolling: ${this.state.diceBoard.rolling}`,
                )
            },
        )
    }

    handleAnimationEnd() {
        this.setState(
            (prevState) => ({
                ...prevState,
                diceBoard: {
                    ...prevState.diceBoard,
                    rolling: false,
                },
            }),
            () => {
                console.log(
                    `animation ended. Dice rolling: ${this.state.diceBoard.rolling}`,
                )
            },
        )
    }

    reset() {
        this.setState(this.defaultState(this.props))
    }

    render() {
        const {
            dieStates: myDieStates,
            completed: myGameFinished,
            rolling,
        } = this.state.diceBoard
        const { dieStates: oppDieStates, completed: oppGameFinished } =
            this.state.oppState
        const { oppReady } = this.state

        let gameButton = (
            <button
                className={`cool-button drop-shadow text-white ${
                    oppReady ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={
                    oppReady
                        ? myGameFinished || oppGameFinished
                            ? this.reset
                            : this.handleRoll
                        : () => {}
                }
            >
                {myGameFinished || oppGameFinished ? 'Start Again' : 'Roll'}
            </button>
        )

        return (
            <div className="main">
                {myGameFinished && !oppGameFinished && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="desc">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <p className="desc">Try to finish before your opponent!</p>
                <div className="dice-boards">
                    <h2 className="player-header">My Board</h2>
                    <h2 className="player-header opponent">Opponent's Board</h2>
                    <DiceBoard
                        ready={oppReady}
                        opponent={false}
                        rolling={rolling}
                        dieStates={myDieStates}
                        handleFreeze={this.handleFreeze}
                        handleAnimationEnd={this.handleAnimationEnd}
                    />
                    {oppReady ? (
                        <DiceBoard
                            ready={oppReady}
                            opponent={true}
                            rolling={false}
                            dieStates={oppDieStates}
                            handleFreeze={this.handleFreeze}
                            handleAnimationEnd={this.handleAnimationEnd}
                        />
                    ) : (
                        <div className="m-auto">
                            <p className="opacity-50">Waiting on Opponent</p>
                            <Loader />
                        </div>
                    )}
                </div>
                {gameButton}
            </div>
        )
    }
}
