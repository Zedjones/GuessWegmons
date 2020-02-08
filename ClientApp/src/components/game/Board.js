import React, { Component } from 'react';
import { GameCard } from './GameCard';

export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <GameCard></GameCard>
                <GameCard></GameCard>
                <GameCard></GameCard>
                <GameCard></GameCard>
            </div>
        )
    }
}