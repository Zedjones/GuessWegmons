import React, { Component } from 'react';
import { Button, Input, Label } from 'reactstrap';
import { Alert } from 'reactstrap';

export class NewRoom extends Component {
    constructor(props) {
        super(props)
        this.state = { showAlert: false, selected: 'easy' }
        this.getCode = this.getCode.bind(this)
        this.select = this.select.bind(this)
    }

    getCode() {
        fetch(`/api/room/create?hard=${(this.state.selected === "hard").toString()}`, {method: 'post'})
            .then((resp) => {
                if (!resp.ok)
                    throw Error("")
                return resp.json()
            })
            .then((resp) => {
                this.props.joinRoom(resp.id)
                this.setState({ showAlert: false })
            })
            .catch((error) => {
                this.setState({ codeErr: "Couldn't create a room. Try again later.", showAlert: true })
            })
    }

    select(ev) {
        this.setState({ selected: ev.target.value })
    }

    render() {
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        return (
            <div>
                <Alert style={alertStyle} color="info">{this.state.codeErr}</Alert>
                <h2>Start A New Room</h2>
                <Label style={optionStyle}><Input type="radio" value="easy" checked={this.state.selected === "easy"} onChange={this.select} />Easy</Label>
                <Label><Input type="radio" value="hard" checked={this.state.selected === "hard"} onChange={this.select} />Hard</Label>
                <br></br>
                <Button onClick={this.getCode}>Create</Button>
            </div>
        )
    }
}

const optionStyle = {
    display: 'inline-block',
    width: '5em',
    margin: '0 10px'
}