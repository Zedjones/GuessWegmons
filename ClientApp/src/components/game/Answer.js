import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';

export class Answer extends Component {
    constructor(props) {
        super(props)
        this.state = {textVal: '', choice: null}
        this.handleChange = this.handleChange.bind(this)
        this.yes = this.yes.bind(this)
        this.no = this.no.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleChange(event) {
        this.setState({ textval: event.target.value });
    }

    yes() {
        this.setState({choice: true})
        this.submit(true)
    }

    no() {
        this.setState({choice: false})
        this.submit(false)
    }

    submit(val) {
        console.log({'answer': val})
        fetch('/api/message/answer', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'answer': val})
        })
        .then((resp) => {
            return
        })
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

