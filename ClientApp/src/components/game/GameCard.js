import React, { Component } from 'react';
import Popup from "reactjs-popup";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
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
        if (this.props.highlight)
            highlightStyle = { border: '1px solid #006de9' }
        return (
            <div>
                <Card style={Object.assign({}, cardStyle, markedStyle, highlightStyle)} onClick={this.toggle}>
                    <CardImg top width="100%" src={this.props.val.pictureURL} alt={this.props.val.name} />
                    <CardBody>
                        <CardTitle style={titleStyle}>{this.props.val.name}</CardTitle>
                        <Popup on="focus" closeOnDocumentClick trigger={<button>. . .</button>} position="right">
                            <CardInfo val={this.props.val} />
                        </Popup>
                    </CardBody>
                </Card>
            </div>
        )
    }

}

const cardStyle = {
    margin: '5px'
}

const titleStyle = {
    textAlign: 'center'
}