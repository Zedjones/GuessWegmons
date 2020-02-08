import React, { Component } from 'react';
import { NewRoom } from './room/NewRoom';
import { JoinRoom } from './room/JoinRoom';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props)
        this.state = {inGame: false}

        // function binding
        this.joinGame = this.joinGame.bind(this)
    }

    componentDidMount() {
        // TODO - check if in game
        // val = fetch(...)
        this.setState({inGame: false}) // inGame: val
    }

    joinGame(code) {
        this.setState({inGame: true})
    }

    render() {
        if (this.state.inGame) {
            window.location = '/game'
        }
        else {
            return (
                <div>
                    <NewRoom joinRoom={this.joinGame}></NewRoom>
                    <JoinRoom joinRoom={this.joinGame}></JoinRoom>
                </div>
            );
        }
    }
}
