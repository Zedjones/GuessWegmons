import React, { Component } from 'react';
import { GameCard } from './GameCard';

export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = { boardInfo: null }
    }

    componentDidMount() {
        fetch('/api/piece')
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                this.setState({board: resp})
                console.log(resp)
            })
    }

    render() {
        if (this.state.boardInfo) {
            return (
                <div>
                    <GameCard img={this.state.board[0].pictureURL} name={this.state.board[0].name}></GameCard>
                    <GameCard img={this.state.board[1].pictureURL} name={this.state.board[1].name}></GameCard>
                    <GameCard img={this.state.board[2].pictureURL} name={this.state.board[2].name}></GameCard>
                    <GameCard img={this.state.board[3].pictureURL} name={this.state.board[3].name}></GameCard>
                    <GameCard img={this.state.board[4].pictureURL} name={this.state.board[4].name}></GameCard>
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