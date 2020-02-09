import React, { Component } from 'react';
import { NewRoom } from './room/NewRoom';
import { JoinRoom } from './room/JoinRoom';
import { Alert } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props)
        this.state = {showAlert: false}

        
        this.joinGame = this.joinGame.bind(this)
    }

    componentDidMount() {
        fetch('/api/room', {method: 'get'})
        .then((resp) => {
            if (!resp.ok)
                throw Error("")
            return resp.json()
        })
        .then((resp) => {
            console.log(resp)
            this.joinGame(resp.id)
        })
        .catch((error) => {
            this.setState({codeErr: "Something went wrong. Try again later.", showAlert: true})
        })
    }

    joinGame(code) {
        this.setState({inGame: true})
        window.location = `/game/:${code}`
    }

    render() {
        const alertStyle = (this.state.showAlert) ? {display: 'block'} : {display: 'none'}
        return (
            <div className="center">
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
                <NewRoom joinRoom={this.joinGame}></NewRoom>
                <JoinRoom joinRoom={this.joinGame}></JoinRoom>
            </div>
        );
    }
}
