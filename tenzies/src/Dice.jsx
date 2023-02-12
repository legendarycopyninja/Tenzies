export default function Dice(props){

    const dieColor= {
        backgroundColor:props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="dice_numberbody" style={dieColor} onClick={props.holdDice}>
            <h2 className="dice-number">{props.value}</h2>
        </div>
    )
}