import React, { Component } from 'react';
import Popup from "reactjs-popup";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { CardInfo } from './CardInfo';
import Dots from './Types/dots.png';

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
        if (this.props.highlight)
            highlightStyle = { border: '1px solid #006de9' }
        return (
            <div>
                <Card style={Object.assign({}, cardStyle, markedStyle, highlightStyle)} onClick={this.toggle}>
                    <Popup on="hover" closeOnDocumentClick trigger={<button style={buttonStyle}><img src={Dots}></img></button>} position="right">
                        <CardInfo style='padding: 5px' val={this.props.val} />
                    </Popup>
                    <CardImg top width="100%" style={imgStyle} src={this.props.val.pictureURL} alt={this.props.val.name} />
                    <CardBody>
                        <CardTitle style={titleStyle}>{this.props.val.name}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const cardStyle = {
    margin: '5px',
    padding: '10px',
    height: '16em'
}

const titleStyle = {
    textAlign: 'center'
}

const buttonStyle = { 
    paddingTop: '5px' ,  
    background: 'transparent',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'right'
}
const imgStyle = {
    margin: 'auto',
    height: '120px',
    width: '120px',
    opacity: '1.0'
}
    
