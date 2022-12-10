import React, { AnimationEventHandler, SyntheticEvent } from 'react'
import { nanoid } from 'nanoid'
import '../style/die.css'

type MyProps = {
    ready: boolean
    rolling: boolean
    value: number
    isFrozen: boolean
    handleClick: (event: SyntheticEvent) => void
    handleAnimationEnd: AnimationEventHandler<HTMLDivElement>
}
export default function Die(props: MyProps) {
    const { value, isFrozen, handleClick, handleAnimationEnd } = props

    const faces = new Array<JSX.Element>(6)
        .fill(<div></div>)
        .map((_, index) => {
            const faceValue = ((value + index - 1) % 6) + 1
            return (
                <div
                    key={nanoid()}
                    id={`face-${index + 1}`}
                    className={`cool-button die-face`}
                    onClick={handleClick}
                >
                    {faceValue}
                </div>
            )
        })

    return (
        <div
            className={`cube ${isFrozen ? 'frozen' : ''}`}
            onAnimationEnd={handleAnimationEnd}
            data-rolling={props.rolling && !isFrozen ? 'true' : 'false'}
        >
            {faces}
        </div>
    )
}
