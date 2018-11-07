import React, { PureComponent } from 'react'
import './Pause.css';
import { secondsToString } from "../utils/functions";

export default class Pause extends PureComponent {


    render() {
        const { item, countdown } = this.props;

        return (
            <div className="flex column">
                {JSON.stringify(item) !== '{}' ?
                    <>
                        <p className="headline">Starting at</p>
                        <h2>{item.start}</h2>
                        <h1>{item.name}</h1>
                        <h2>{secondsToString(item.duration)}</h2>
                        {!countdown ?
                            <p>{} </p> : <h1>{countdown}</h1>

                        }
                        {
                            item.equipment &&
                            <>
                                <p className="headline">For this station you will need:</p>
                                <h2>{item.equipment}</h2>
                            </>
                        }
                    </>
                    : <h2>No more classes today, come back tomorrow</h2>}
            </div>
        )
    }
}
