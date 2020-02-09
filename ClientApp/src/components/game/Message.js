

export class Message extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h4>{this.props.player} asks: {this.props.question}</h4>
                <h4>{this.props.answer}</h4>
            </div>
        )
    }
}