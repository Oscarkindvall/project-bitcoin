import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'

// const [profit, setProfit] = useState(false);

export default function(props) {
    // let profit = props.buyObject.bitcoinValue > props.buyObject.oldBitcoinValue ? setProfit(true) : setProfit(false);
    
    return (
    <li>
        <div>Datum: {props.buyObject.date} </div>
        <div>Kurs: {(props.buyObject.bitcoinValue).toFixed(2)} USD</div>
        <div>Antal: {props.buyObject.buySize} </div>
        <div>Gav: {props.buyObject.amount} USD </div>
        {/* {profit ? (
        <div>Nuvarande marknadsvärde: {props.buyObject.amount*props.buyObject.bitcoinValue} <Icon color='green' name='angle up' /></div>
        )
        :(
        <div>Nuvarande marknadsvärde: TODO <Icon color='red' name='angle up' /></div>
        )} */}
        
        <div> ------------------------------  </div>
     </li>
    )
}