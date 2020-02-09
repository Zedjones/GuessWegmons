import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export class GameCard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Card style={cardStyle}>
                    <CardImg top width="100%" src={this.props.img} alt={this.props.name} />
                    <CardBody>
                        <CardTitle style={titleStyle}>{this.props.name}</CardTitle>
                        {/* <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Button</Button> */}
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