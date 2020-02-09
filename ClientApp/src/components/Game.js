import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Board } from './game/Board';

export class Game extends Component {
    static timeoutCheck = 2000

    constructor(props) {
        super(props)
        this.state = { code: window.location.pathname.split(':')[1], playersReady: false, showAlert: false }

        this.getPlayersReady = this.getPlayersReady.bind(this)
    }

    componentDidMount() {
        var playerCheck = setInterval(this.getPlayersReady, Game.timeoutCheck)
        this.setState({ playerCheckInterval: playerCheck })
    }

    getPlayersReady() {
        fetch('/api/room', {method: 'get'})
            .then((resp) => {
                if (!resp.ok)
                    throw Error("")
                return resp.json()
            })
            .then((resp) => {
                // TODO what does data look like
                console.log(resp)
            })
            .catch((error) => {
                try { clearInterval(this.state.playerCheckInterval) }
                catch (err) { console.log(err) }
                this.setState({ codeErr: "Something went wrong. Try again later.", showAlert: true, playerCheckInterval: null })
            })
    }

    render() {
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        return (
            <div>
                <p>Room Number: <strong>{this.state.code}</strong></p>
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
                <Board></Board>
            </div>
        )
    }
}