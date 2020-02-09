import React, { Component } from 'react';
import { GameCard } from './GameCard';

export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = { board: null }
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
        if (this.state.board) {
            return (
                <div style={boardStyle}>
                    <GameCard img={this.state.board[0].pictureURL} name={this.state.board[0].name}></GameCard>
                    <GameCard img={this.state.board[1].pictureURL} name={this.state.board[1].name}></GameCard>
                    <GameCard img={this.state.board[2].pictureURL} name={this.state.board[2].name}></GameCard>
                    <GameCard img={this.state.board[3].pictureURL} name={this.state.board[3].name}></GameCard>
                    <GameCard img={this.state.board[4].pictureURL} name={this.state.board[4].name}></GameCard>
                    <GameCard img={this.state.board[5].pictureURL} name={this.state.board[5].name}></GameCard>
                    <GameCard img={this.state.board[6].pictureURL} name={this.state.board[6].name}></GameCard>
                    <GameCard img={this.state.board[7].pictureURL} name={this.state.board[7].name}></GameCard>
                    <GameCard img={this.state.board[8].pictureURL} name={this.state.board[8].name}></GameCard>
                    <GameCard img={this.state.board[9].pictureURL} name={this.state.board[9].name}></GameCard>
                    <GameCard img={this.state.board[10].pictureURL} name={this.state.board[10].name}></GameCard>
                    <GameCard img={this.state.board[11].pictureURL} name={this.state.board[11].name}></GameCard>
                    <GameCard img={this.state.board[12].pictureURL} name={this.state.board[12].name}></GameCard>
                    <GameCard img={this.state.board[13].pictureURL} name={this.state.board[13].name}></GameCard>
                    <GameCard img={this.state.board[14].pictureURL} name={this.state.board[14].name}></GameCard>
                    <GameCard img={this.state.board[15].pictureURL} name={this.state.board[15].name}></GameCard>
                    <GameCard img={this.state.board[16].pictureURL} name={this.state.board[16].name}></GameCard>
                    <GameCard img={this.state.board[17].pictureURL} name={this.state.board[17].name}></GameCard>
                    <GameCard img={this.state.board[18].pictureURL} name={this.state.board[18].name}></GameCard>
                    <GameCard img={this.state.board[19].pictureURL} name={this.state.board[19].name}></GameCard>
                    <GameCard img={this.state.board[20].pictureURL} name={this.state.board[20].name}></GameCard>
                    <GameCard img={this.state.board[21].pictureURL} name={this.state.board[21].name}></GameCard>
                    <GameCard img={this.state.board[22].pictureURL} name={this.state.board[22].name}></GameCard>
                    <GameCard img={this.state.board[23].pictureURL} name={this.state.board[23].name}></GameCard>
                    <GameCard img={this.state.board[24].pictureURL} name={this.state.board[24].name}></GameCard>
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

const boardStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'
}