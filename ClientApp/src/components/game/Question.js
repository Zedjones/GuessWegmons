import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';

export class Question extends Component {
    constructor(props) {
        super(props)
        this.state = { textVal: '' }
        this.handleChange = this.handleChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
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
            body: JSON.stringify({ 'question': this.state.textVal, 'answer': null })
        })
            .then((resp) => {
                return
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
            </div>
        )
    }
}
