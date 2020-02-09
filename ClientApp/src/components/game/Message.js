

function Message(props){
    return (
        <div>
            <h4>{props.player} asks: {props.question}</h4>
            <h4>{props.answer}</h4>
        </div>
    )
}