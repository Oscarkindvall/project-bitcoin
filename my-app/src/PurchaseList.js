

export default function(props) {
    return (
    <li>
        {console.log(props)}
        <p> {props.buyObject.date} </p>
        <p> {props.buyObject.amount} </p>
        <p> {props.buyObject.bitcoinValue} </p>
     </li>
    )
}