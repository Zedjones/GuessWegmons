import React, { Component } from 'react';

export class Message extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p><strong>Player {this.props.player} Asked:</strong> {this.props.question} <strong>Answer:</strong> {this.props.answer}</p>
            </div>
        )
    }
}
