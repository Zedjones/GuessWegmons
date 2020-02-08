import React, { Component } from 'react';

export class JoinRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {textval: ''}
        // function binding
        this.joinWithCode = this.joinWithCode.bind(this)
    }

    joinWithCode() {
        // TODO call api to validate and join room
        this.props.joinRoom(this.state.textval)
    }

    render() {
        return (
            <div>
                <input type='text' value={this.state.textval}/>
                <button onClick={this.joinWithCode}>Join Room</button>
            </div>
        )
    }
}