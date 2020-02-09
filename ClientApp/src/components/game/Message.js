function Message(props){
    return (
        <div>
            <h4>{props.player} asked: {props.question}</h4>
            <h4>Answer: {props.answer}</h4>
        </div>
    )
}
