import React from 'react'
import { secondsToString } from "../utils/functions";

export default function Play(props) {
    const { item, countdown } = props;
    return (
        <div>
            <h2>Get ready</h2>
            <h1>{item.name}</h1>
            <h2>{secondsToString(item.duration * 4)}</h2> {/* TIMES THE AMOUNT */}
            <div className="video-wrapper">
                <video src={'https://media.w3.org/2010/05/sintel/trailer.mp4'} autoPlay muted />
                <h1 className="countdown">{countdown}</h1>
            </div>
        </div>
    )
}
