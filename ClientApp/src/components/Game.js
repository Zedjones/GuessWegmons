import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { History } from './game/History';
import { Board } from './game/Board';
import { Question } from './game/Question';
import { Answer } from './game/Answer';

export class Game extends Component {
    static timeoutCheck = 2000

    constructor(props) {
        super(props)
        this.state = { code: window.location.pathname.split(':')[1], playersReady: false, showAlert: false, boardLoaded: false, latestQuestion: null, latestAnswer: null, questionOverride: false }

        this.getRoom = this.getRoom.bind(this)
        this.boardLoaded = this.boardLoaded.bind(this)
        this.latestQuestion = this.latestQuestion.bind(this)
        this.askedQuestion = this.askedQuestion.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }

    componentDidMount() {
        var roomInt = setInterval(this.getRoom, Game.timeoutCheck)
        this.setState({ playerCheckInterval: roomInt })
    }

    getRoom() {
        fetch('/api/room', { method: 'get' })
            .then((resp) => {
                if (!resp.ok)
                    throw Error("")
                return resp.json()
            })
            .then((resp) => {
                // players ready?
                if (resp.player1In && resp.player2In) {
                    this.state.playersReady = true
                }
                // my turn?
                if (resp.myTurn) {
                    this.setState({ myTurn: true }) // for now yes
                } else {
                    this.setState({ questionOverride: false, myTurn: false, gameOver: false })
                }

                // has question been asked?
                this.latestQuestion()

            })
            .catch((error) => {
                this.setState({ codeErr: "Something went wrong. Try again later.", showAlert: true, playerCheckInterval: null })
            })
    }

    latestQuestion() {
        fetch('/api/message/question', { method: 'get' })
            .then((resp) => {
                if (resp == null) {
                    this.setState({ latestQuestion: null, latestAnswer: null })
                    throw Error('')
                } else {
                    return resp.json()
                }
            })
            .then((resp) => {
                console.log(resp)
                this.setState({ latestQuestion: resp.question, latestAnswer: resp.answer })
            })
            .catch((err) => { return })
    }

    boardLoaded() {
        this.setState({ boardLoaded: true })
    }

    askedQuestion() {
        this.setState({ questionOverride: true })
    }

    gameOver(won) {
        if (won) {
            this.setState({ gameOver: "Correct! You win!"})
        } else {
            this.setState({ gameOver: "Wrong. Wait for opponent's question."})
        }
    }

    render() {
        var loaded = this.state.boardLoaded
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        var question = (this.state.myTurn && !this.state.questionOverride && this.state.playersReady) ? <Question updateGame={this.askedQuestion} gameOver={this.gameOver}></Question> : <div></div>
        var answer = (!this.state.myTurn && this.state.latestQuestion && this.state.playersReady) ? <Answer question={this.state.latestQuestion}></Answer> : <div></div>
        var gameover = (this.state.gameOver) ? <Alert color="primary">{this.state.gameOver}</Alert> : <div></div>
            return (
                <div>
                    <p>Room Number: <strong>{this.state.code}</strong></p>
                    <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
                    {gameover}
                    <Board boardLoaded={this.boardLoaded}></Board>
                    <History boardLoaded={loaded}></History>
                    {question}
                    {answer}
                </div>
            )
    }
}