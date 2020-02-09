import React, { Component } from 'react';
import { Message } from './Message';

export class History extends Component {


    render() {
        return (
            <div style={historyStyle}> 
            {/* <p>ASDASDASD</p> */}
                <ol>{this.props.questions && this.props.questions.map((val, i) => {return <li key={i}><Message player={val.player} question={val.question} answer={val.answer.toString()}></Message></li>;})}</ol>
                {/* .map((val) => {
                    return <Message player={val.player} question={val.question} answer={val.answer}></Message>;
                })} */}
            </div>
        );
    }
}

const historyStyle = {
    width: '100%',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflowY: 'scroll'
}