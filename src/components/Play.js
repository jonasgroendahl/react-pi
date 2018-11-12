import React from 'react'
import { secondsToString } from "../utils/functions";

export default function Play(props) {
    const { item, countdown } = props;
    return (
        <div>
            <h2>Get ready</h2>
            <h1>{item.title}</h1>
            <h2>{secondsToString(item.duration * item.amount)}</h2> {/* TIMES THE AMOUNT */}
            <div className="video-wrapper">
                <video src={`/videos/${item.navn}`} autoPlay muted />
                <h1 className="countdown">{countdown}</h1>
            </div>
        </div>
    )
}
