import React, { Component } from 'react';
import { GameCard } from './GameCard';

export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = { boardInfo: null }
    }

    componentDidMount() {
        // TODO endpoint board info..?
        fetch('')
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                // TODO what is good or bad?
                console.log(resp)
            })
    }

    render() {
        if (this.state.boardInfo) {
            return (
                <div>
                    board
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Loading Board Data...</h2>
                </div>
            )
        }
    }
}