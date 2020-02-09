import React, { Component } from 'react';

export class History extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h4>{props.player} asks: {props.question}</h4>
                <h4>{props.answer}</h4>
            </div>
        )
    }
}