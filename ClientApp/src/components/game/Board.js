import React, { Component } from 'react';
import { GameCard } from './GameCard';

export class Board extends Component {
    static timeoutCheck = 500
    constructor(props) {
        super(props)
        this.state = { board: null }
        this.getBoard = this.getBoard.bind(this)
    }

    componentDidMount() {
        var boardcheck = setInterval(this.getBoard, Board.timeoutCheck)
        this.setState({ boardCheckInterval: boardcheck })
    }

    getBoard() {
        fetch('/api/piece')
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                if (resp.length >= 1) {
                    this.setState({ board: resp })
                    this.clearBoardInterval()
                }
            })
            .catch((err) => {
                this.clearBoardInterval()
            })
    }

    clearBoardInterval() {
        try { clearInterval(this.state.boardCheckInterval) }
        catch (err) { console.log(err) }
    }

    render() {
        if (this.state.board) {
            return (
                <div>
                    <h3 style={header}>Your pokemon is: {this.props.rightAnswer}</h3>
                    <div style={boardStyle}>
                        {this.state.board && this.state.board.map((val, i) => {
                            var highlight = false
                            if(val.name == this.props.rightAnswer){
                                highlight = true
                            }
                            return <GameCard key={i} val={val} highlight={highlight}></GameCard>
                        })}
                    </div>
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

const header = {
}