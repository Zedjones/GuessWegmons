import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class LeaveGame extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.leave = this.leave.bind(this)
    }

    leave() {
        fetch('/api/room/leave', { method: 'get' })
            .then((resp) => {
                window.location = '/'
            })
    }

    render() {
        return (<Button onClick={this.leave} style={leaveGameStyle}>Leave Game</Button>)
    }
}

const leaveGameStyle = { 
    marginLeft: 'auto' 
}