

export default function(props) {
    return (
    <li>
        <div>Datum: {props.buyObject.date} </div>
        <div>Kurs: {(props.buyObject.bitcoinValue).toFixed(2)} USD</div>
        <div>Antal: {props.buyObject.buySize} </div>
        <div>Gav: {props.buyObject.amount} USD </div>
        <div>Nuvarande marknadsvärde: TODO </div>
        <div> ------------------------------  </div>
     </li>
    )
}