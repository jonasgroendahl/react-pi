import React from 'react'

export default function Move(props) {
    return (
        <div>
            <h1>Move to next station</h1>
            <h1 className="countdown">
                {props.countdown}
            </h1>
            <h2>{props.rest ? 'Rest' : ''}</h2>}
        </div>
    )
}
