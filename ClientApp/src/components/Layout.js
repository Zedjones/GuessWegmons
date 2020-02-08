import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                {/* <NavMenu /> */}
                <Container style={topStyle}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

const topStyle = {
    marginTop: '25px'
}