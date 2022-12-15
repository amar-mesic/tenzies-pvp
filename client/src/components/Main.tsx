import { nanoid } from 'nanoid'
import React, { SyntheticEvent } from 'react'
import Confetti from 'react-confetti'
import { DieState } from '../states/ComponentState'
import '../style/main.css'
import DiceBoard from './DiceBoard'
import Loader from './Loader'

/**
 * Properties of Main
 */
type MainProps = {
    noOfDice: number
    socket: any
}

/**
 * Representation of state of a Diceboard
 */
type DiceBoardState = {
    dieStates: DieState[]
    completed: boolean
    rolling: boolean
}

/**
 * Main consists of two diceboards for player and opponent,
 * and a boolean for whether the opponent is ready to play (i.e. whether palyer has gotten opponent)
 */
type MainState = {
    diceBoard: DiceBoardState
    oppState: DiceBoardState
    oppReady: boolean
}

/**
 * Main Class of the app.
 */
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

    /**
     * Run code after render
     */
    componentDidMount() {
        const { socket } = this.props

        socket.on('player_joined', () => {
            socket.emit('send_init_state', this.state.diceBoard)
        })

        /**
         * When receiving opponent's initial state, set readiness to true,
         * and respond with player initial state. This way we do not need to care
         * who got in the room first.
         */
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

        // playDsPopup('ds1')
    }

    /**
     * Fill array with one value, then make sure it is random using map.
     * Called in constructor.
     *
     * @param props determines the number of dice on the diceboard.
     * @returns a default and random initial state for a diceboard.
     */
    defaultState({ noOfDice }: MainProps): MainState {
        const myDiceBoard = {
            dieStates: new Array<DieState>(noOfDice)
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

    /**
     * Handle the freezing of the clicked die. Called each time die is clicked.
     * Callback of setState ensures that the opponent is informed of the move made,
     * and checks if game is won.
     *
     * @param e the click event which we need to avoid default behaviour.
     * @param id of each die in order to select the one pressed.
     */
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

    /**
     * Called after every time a die is frozen.
     * Checks that all dice are frozen and have the same value.
     *
     * If completed, update state and send move to opponent.
     * @todo send a unique message stating that game is won.
     */
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

    /**
     * Called every time the Roll Button is clicked.
     * For each unfrozen die, assign it a new value, and set the diceboard to be rolling.
     */
    handleRoll() {
        /**
         * @callback anonymous send move to opponent.
         */
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

    /**
     * Called every time the roll animation ends.
     * Set the diceboard rolling to false.
     */
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

    /**
     * Called when the game is over and the Roll Button (in a different state is clicked).
     */
    reset() {
        this.setState(this.defaultState(this.props))
    }

    /**
     * Create the layout of main.
     * It contains some header text, two diceboards, and a button to roll the dice.
     *
     * @returns the  layout of the Main Element.
     */
    render() {
        const {
            dieStates: myDieStates,
            completed: myGameFinished,
            rolling,
        } = this.state.diceBoard
        const { dieStates: oppDieStates, completed: oppGameFinished } =
            this.state.oppState
        const { oppReady } = this.state

        const lossPopup =
            !myGameFinished && oppGameFinished ? (
                <dialog
                    open={true}
                    onAnimationEnd={(e) => {
                        const dialog = e.currentTarget
                        dialog.removeAttribute('open')
                    }}
                    className="you-lost-popup"
                >
                    <h1>YOU LOST</h1>
                </dialog>
            ) : (
                <></>
            )

        const gameButton = (
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
                {lossPopup}
                <h1 className="title">Tenzies</h1>
                <p className="desc">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <p className="desc">Try to finish before your opponent!</p>
                <div className="dice-boards">
                    <div className="player-board">
                        <h2 className="player-header">My Board</h2>
                        <DiceBoard
                            ready={oppReady}
                            opponent={false}
                            rolling={rolling}
                            dieStates={myDieStates}
                            handleFreeze={this.handleFreeze}
                            handleAnimationEnd={this.handleAnimationEnd}
                        />
                    </div>
                    <div className="player-board">
                        <h2 className="player-header opponent">
                            Opponent's Board
                        </h2>
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
                            <div className="m-auto pt-4">
                                <p className="opacity-50">
                                    Waiting on Opponent
                                </p>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                {gameButton}
            </div>
        )
    }
}
