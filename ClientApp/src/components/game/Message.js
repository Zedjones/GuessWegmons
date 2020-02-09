import React, { Component } from 'react';

export class Message extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h4>{this.props.player} asked: {this.props.question}</h4>
                <h4>Answer: {this.props.answer}</h4>
            </div>
        )
    }
}
