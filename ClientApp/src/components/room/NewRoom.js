import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Alert } from 'reactstrap';

export class NewRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {showAlert: false}
        // function binding
        this.getCode = this.getCode.bind(this)
    }

    getCode() {
        fetch('/api/room/create', {method: 'post'})
        .then((resp) => {
            if (!resp.ok)
                throw Error("")
            return resp.json()
        })
        .then((resp) => {
            this.props.joinRoom(resp.id)
            this.setState({showAlert: false})
        })
        .catch((error) => {
            this.setState({codeErr: "Something went wrong. Try again later.", showAlert: true})
        })
    }

    render() {
        const alertStyle = (this.state.showAlert) ? {display: 'block'} : {display: 'none'}
        return (
            <div>
                <Alert style={alertStyle} color="info">{this.state.codeErr}</Alert>
                <h2>Start A New Room</h2>
                <Button onClick={this.getCode}>Create</Button>
            </div>
        )
    }
}