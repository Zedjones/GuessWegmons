import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';

export class JoinRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {textval: ''}
        // function binding
        this.joinWithCode = this.joinWithCode.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({textval: event.target.value});
    }

    joinWithCode() {
        // TODO call api to validate and join room
        this.props.joinRoom(this.state.textval)
    }

    render() {
        return (
            <div>
                <h2>Or Join A Room</h2>
                <Input type="text" value={this.state.textval} style={codeInputStyle} onChange={this.handleChange} className="center" />
                <Button onClick={this.joinWithCode}>Join Room</Button>
            </div>
        )
    }
}

const codeInputStyle = {
    maxWidth: '10em'
};