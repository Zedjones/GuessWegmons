import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { History } from './game/History';
import { Board } from './game/Board';
import { Question } from './game/Question';

export class Game extends Component {
    static timeoutCheck = 2000

    constructor(props) {
        super(props)
        this.state = { code: window.location.pathname.split(':')[1], playersReady: false, showAlert: false, boardLoaded: false, latestQuestion: null, latestAnswer: null}

        this.getRoom = this.getRoom.bind(this)
        this.boardLoaded = this.boardLoaded.bind(this)
        this.latestQuestion = this.latestQuestion.bind(this)
        this.askedQuestion = this.askedQuestion.bind(this)
    }

    componentDidMount() {
        var roomInt = setInterval(this.getRoom, Game.timeoutCheck)
        this.setState({ playerCheckInterval: roomInt })
    }

    getRoom() {
        fetch('/api/room', {method: 'get'})
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
                this.setState({myTurn: true}) // for now yes

                // has question been asked?
                this.latestQuestion()

            })
            .catch((error) => {
                this.setState({ codeErr: "Something went wrong. Try again later.", showAlert: true, playerCheckInterval: null })
            })
    }

    latestQuestion() {
        fetch('/api/message/question', {method: 'get'})
        .then((resp) => {
            return resp.json()
        })
        .then((resp) => {
            this.setState({latestQuestion: resp.question, latestAnswer: resp.answer})
        })
    }

    boardLoaded() {
        this.setState({boardLoaded: true})
    }

    askedQuestion() {
        this.setState({myTurn: false})
    }

    render() {
        var loaded = this.state.boardLoaded
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        var question = (this.state.myTurn) ? <Question update={this.askedQuestion}></Question> : <div></div>
        // var answer = (!this.state.myTurn && this.state.latestQuestion != null) ? <Answer></Answer> : <div></div>
        return (
            <div>
                <p>Room Number: <strong>{this.state.code}</strong></p>
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
                <Board boardLoaded={this.boardLoaded}></Board>
                <History boardLoaded={loaded}></History>
                {question}
                {/* {answer} */}
            </div>
        )
    }
}