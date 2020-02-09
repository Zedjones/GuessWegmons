import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';
import { Alert } from 'reactstrap';

export class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {textVal: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ textval: event.target.value });
    }

    sendMessage() {
        fetch('/api/message/question', {method: 'post'})
        this.props.update()
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

const codeInputStyle = {
    maxWidth: '10em'
}
