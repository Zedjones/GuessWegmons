import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        // TODO get from session
        this.setState({inGame: false})
    }

    render() {
        if (this.state.inGame) {
            return (
                <Game></Game>
            );
        }
        return (
            <ChoosePlayer></ChoosePlayer>
        );
    }
}
