import React, { Component } from 'react';
import { NewRoom } from './room/NewRoom';
import { JoinRoom } from './room/JoinRoom';
import { Alert } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props)
        this.state = { showAlert: false, wonFrom: null, wonMessage: "" }


        this.joinGame = this.joinGame.bind(this)
    }

    componentDidMount() {
        fetch('/api/room', { method: 'get' })
            .then((resp) => {
                if (!resp.ok)
                    throw Error('')
                return resp.json()
            })
            .then((resp) => {
                console.log(resp)
                this.joinGame(resp.name)
            })
            .catch((err) => { return })

        const urlParams = new URLSearchParams(window.location.search)
        let won = urlParams.get('won')
        if (won === 'true') {
            this.setState({ wonFrom: true })
            this.setState({ wonMessage: "Congratulations! You Won!" })
        }
        else if (won === 'false') {
            this.setState({ wonFrom: false })
            this.setState({ wonMessage: "Sorry. You Lost." })
        }
        else {
            this.setState({ wonFrom: null })
            this.setState({ wonMessage: "" })
        }
    }

    joinGame(code) {
        window.location = `/game/:${code}`
    }

    render() {
        const alertStyle = (this.state.showAlert) ? { display: 'block' } : { display: 'none' }
        const wonStyle = (this.state.wonFrom !== null) ? { display: 'block' } : { display: 'none' }
        return (
            <div className="center">
                <Alert style={alertStyle} color="warning">{this.state.codeErr}</Alert>
                <Alert style={wonStyle} color={(this.state.wonFrom) ? "success" : "danger"}>{this.state.wonMessage}</Alert>
                <NewRoom joinRoom={this.joinGame}></NewRoom>
                <JoinRoom joinRoom={this.joinGame}></JoinRoom>
            </div>
        );
    }
}
