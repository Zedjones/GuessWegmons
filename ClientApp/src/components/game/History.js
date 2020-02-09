import React, { Component } from 'react';

export class History extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        return (
            <div className="center">
                <Message player={this.props.player} question={this.props.question} answer={this.props.answer}></Message>
            </div>
        );
    }
}