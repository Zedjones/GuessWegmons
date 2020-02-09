import React, { Component } from 'react';

export class History extends Component {

    constructor(props) {
        super(props)
        this.state = { guesses: [] }
    }


    addMessage(player, question, answer) {
        let currGuess = this.state.guesses;
        currGuess.push({
            "player" : player,
            "question" : question,
            "answer" : answer
        });
        this.setState(currGuess);
    }


    createMessage(message) {
        return <Message player={message.player} question={message.question} answer={message.answer}></Message>
    }


    createMessages(messages) {
        return messages.map(message => {
            this.createMessage(message);
        });
    }

    render() {
        return (
            <div className="center">
                {this.createMessages(this.state.guesses)}
            </div>
        );
    }
}
