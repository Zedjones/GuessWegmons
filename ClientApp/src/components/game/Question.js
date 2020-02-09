import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';

export class Question extends Component {
    constructor(props) {
        super(props)
        this.state = { textVal: '' }
        this.handleChange = this.handleChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleGuess = this.handleGuess.bind(this)
        this.sendGuess = this.sendGuess.bind(this)
    }

    handleChange(event) {
        this.setState({ textVal: event.target.value });
    }

    sendMessage() {
        fetch('/api/message/question', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'question': this.state.textVal })
        })
            .then((resp) => {
                return
            })
        this.props.updateGame()
    }

    handleGuess(event) {
        this.setState({ guess: event.target.value })
    }

    sendGuess() {
        // TODO submit guess endpoint
        fetch(`/api/room/guess?guess=${this.state.guess}`, { method: 'post' })
            .then((resp) => {
                if (resp.ok === true){
                    this.props.gameOver(true)
                } else {
                    this.props.gameOver(false)
                }
            })
        this.props.updateGame()
    }

    render() {
        return (
            <div>
                <h2>Ask A Question</h2>
                <Input type="text" value={this.state.textval} onChange={this.handleChange} className="center" />
                <br />
                <Button onClick={this.sendMessage}>Ask</Button>
                <h2>OR Make a Guess</h2>
                <Input type="text" value={this.state.guess} onChange={this.handleGuess} className="center" />
                <br />
                <Button onClick={this.sendGuess}>Guess</Button>
            </div>
        )
    }
}
