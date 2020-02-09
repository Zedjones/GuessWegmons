import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { History } from './game/History';
import { Board } from './game/Board';

export class Game extends Component {
    static timeoutCheck = 2000

    constructor(props) {
        super(props)
        this.state = { code: window.location.pathname.split(':')[1], playersReady: false, showAlert: false, boardLoaded: false}

        this.getPlayersReady = this.getPlayersReady.bind(this)
        this.boardLoaded = this.boardLoaded.bind(this)
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
                if (resp.player1In && resp.player2In) {
                    this.state.playersReady = true
                }
                console.log(resp)
            })
            .catch((error) => {
                try { clearInterval(this.state.playerCheckInterval) }
                catch (err) { console.log(err) }
                this.setState({ codeErr: "Something went wrong. Try again later.", showAlert: true, playerCheckInterval: null })
            })
    }

    boardLoaded() {
        this.setState({boardLoaded: true})
    }

    render() {
        var loaded = this.state.boardLoaded
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        return (
            <div>
                <p>Room Number: <strong>{this.state.code}</strong></p>
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
                <Board boardLoaded={this.boardLoaded}></Board>
                <History boardLoaded={loaded}></History>
            </div>
        )
    }
}