import React, {useState} from 'react'
import { Icon, Statistic } from 'semantic-ui-react'



export default function(props) {
    
    console.log(props)
    let buyVal = (parseInt(props.buyObject.bitcoinValue).toFixed(2))
    let currentVal = parseInt(props.currentBitcoinValue.USD.rate_float.toFixed(2))
    let profit = buyVal < currentVal ? true : false
    let profitPrecentage = Math.abs(((buyVal-currentVal)/buyVal)*100)
    
    return (
        <div className="portfolio-wrapper">  
            <p className="portfolio-value">{props.buyObject.date}</p>
            <p className="portfolio-value">{props.buyObject.buySize}</p>
            <p className="portfolio-value">{buyVal}</p>
            <p className="portfolio-value">{currentVal}</p>
            <p className="portfolio-value">{(props.buyObject.buySize*currentVal).toFixed(2)}</p>
            { profit ? (
                <p className="portfolio-value">+{profitPrecentage.toFixed(2)}% <Icon color='green' name='angle up' /></p>
            )
            :(
                <p className="portfolio-value">-{profitPrecentage.toFixed(2)}% <Icon color='red' name='angle down' /></p>
            )}
        </div>
    )
}


