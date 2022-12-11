import { AnimationEventHandler, SyntheticEvent } from 'react'
import { DieState } from '../states/ComponentState'
import Die from './Die'
import '../style/diceboard.css'

type MyProps = {
    ready: boolean
    opponent: boolean
    rolling: boolean
    dieStates: DieState[]
    handleFreeze: (e: SyntheticEvent, id: string) => void
    handleAnimationEnd: AnimationEventHandler<HTMLDivElement>
}

/**
 *
 * @param {MyProps} props of the diceboard,
 * a lot of which is passed down to each individual die.
 * @returns a diceboard layout.
 */
export default function DiceBoard(props: MyProps) {
    const { ready, rolling, opponent, dieStates, handleFreeze } = props

    const dice = dieStates.map((dieState) => {
        return (
            <Die
                key={dieState.id}
                ready={ready}
                rolling={rolling}
                value={dieState.value}
                isFrozen={dieState.isFrozen}
                handleClick={
                    !opponent && ready
                        ? (e) => handleFreeze(e, dieState.id)
                        : () => {}
                }
                handleAnimationEnd={
                    !opponent ? props.handleAnimationEnd : () => {}
                }
            />
        )
    })

    return (
        <div
            className={`dice-board ${
                opponent ? 'opponent-board opacity-50' : ''
            }`}
        >
            {dice}
        </div>
    )
}
