import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';

export class Answer extends Component {
    constructor(props) {
        super(props)
        this.state = {textVal: ''}
        this.handleChange = this.handleChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleChange(event) {
        this.setState({ textval: event.target.value });
    }

    sendMessage() {
        fetch('/api/message/question', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'question': this.state.textVal})
        })
        .then((resp) => {
            return
        })
        this.props.updateGame()
    }

    render() {
        return (
            <div>
                <h2>Your opponent asked:</h2>
                <p>{this.props.question}</p>
                <Button onClick={this.yes}>Yes</Button>
                <Button onClick={this.no}>No</Button>
            </div>
        )
    }
}

