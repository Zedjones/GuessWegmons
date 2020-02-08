import React, { Component } from 'react';

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
                <button onClick={this.getCode}>Create A Room</button>
            </div>
        )
    }
}