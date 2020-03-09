import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';
import { Alert } from 'reactstrap';

export class JoinRoom extends Component {
    constructor(props) {
        super(props)
        this.state = { textval: '', showAlert: false }

        this.joinWithCode = this.joinWithCode.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ textval: event.target.value });
    }

    joinWithCode(ev) {
        ev.preventDefault()
        fetch(`/api/room/join?id=${this.state.textval}`, { method: 'post' })
            .then((resp) => {
                if (!resp.ok)
                    throw Error("That room doesn't exist")
                return resp
            })
            .then((resp) => {
                this.props.joinRoom(this.state.textval)
                this.setState({ showAlert: false })
            })
            .catch(error => {
                this.setState({ codeErr: error.message, showAlert: true })
            })
    }

    render() {
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        return (
            <form onSubmit={this.joinWithCode}>
                <h2>Or Join A Room</h2>
                <Input type="text" value={this.state.textval} style={codeInputStyle} onChange={this.handleChange} className="center" />
                <br />
                <Input style={inputButton} type="submit" value="Join Room" />
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
            </form>
        )
    }
}

const codeInputStyle = {
    maxWidth: '10em'
}

const inputButton = {
    width: '6em',
    background: '#6c757d',
    color: 'white',
    border: '10px',
    marginLeft: 'auto',
    marginRight: 'auto'
}