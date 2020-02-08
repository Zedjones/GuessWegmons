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

    joinWithCode() {
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
            <div>
                <h2>Or Join A Room</h2>
                <Input type="text" value={this.state.textval} style={codeInputStyle} onChange={this.handleChange} className="center" />
                <br />
                <Button onClick={this.joinWithCode}>Join Room</Button>
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
            </div>
        )
    }
}

const codeInputStyle = {
    maxWidth: '10em'
}
