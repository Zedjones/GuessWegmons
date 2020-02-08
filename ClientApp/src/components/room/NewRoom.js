import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class NewRoom extends Component {
    constructor(props) {
        super(props)

        // function binding
        this.getCode = this.getCode.bind(this)
    }

    getCode() {
        // TODO call api to get new room code
        var code = 0 // fetch(...)
        this.props.joinRoom(code)
    }

    render() {
        return (
            <div>
                <h2>Start A New Room</h2>
                <Button onClick={this.getCode}>Create</Button>
            </div>
        )
    }
}