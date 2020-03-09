import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { Card, CardImg, CardTitle } from 'reactstrap';
import { CardInfo } from './CardInfo';

export class GameCard extends Component {
    constructor(props) {
        super(props)
        this.state = { marked: false }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({ marked: !this.state.marked })
    }

    render() {
        var markedStyle = {}
        if (this.state.marked)
            markedStyle = { background: '#aaa' }
        var highlightStyle = {}
        var star = { display: 'none' }
        if (this.props.highlight)
        {
            highlightStyle = { border: '1px solid black' }
            star = { display: 'block', fontSize: '32px', position: 'absolute', color: 'black' }
        }
        return (
            <div>
                <Popup on="hover" closeOnDocumentClick trigger={
                    <div>
                        <Card style={Object.assign({}, cardStyle, markedStyle, highlightStyle)} onClick={this.toggle}>
                            <CardTitle style={star}>&#9733;</CardTitle>
                            <CardImg top width="100%" style={imgStyle} src={this.props.val.pictureURL} alt={this.props.val.name} />
                        </Card>
                    </div>
                    } position="right">
                    <CardInfo style='padding: 5px' val={this.props.val} updateGame={this.props.updateGame} gameOver={this.props.gameOver}/>
                </Popup>
            </div>
        )
    }
}

const cardStyle = {
    margin: '5px',
    padding: '10px'
}

const imgStyle = {
    margin: 'auto',
    height: '120px',
    width: '120px',
    opacity: '1.0',
}
    
