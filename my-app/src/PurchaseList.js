import React, {useState} from 'react'
import { Icon, Statistic } from 'semantic-ui-react'



export default function(props) {
    
    console.log(props)
    let buyVal = (parseInt(props.buyObject.bitcoinValue).toFixed(2))
    let currentVal = parseInt(props.currentBitcoinValue.USD.rate_float.toFixed(2))
    let profit = buyVal < currentVal
    let profitPrecentage = Math.abs(((buyVal-currentVal)/buyVal).toFixed(4)*100)
    
    return (
        <div>  
            <Statistic className="portfolio-grid" horizontal>
                <Statistic className="list-values" size='mini'>
                    <Statistic.Value className="li-val">{props.buyObject.date}</Statistic.Value>
                </Statistic>
                <Statistic className="list-values" size='mini'>
                    <Statistic.Value className="li-val">{props.buyObject.buySize}</Statistic.Value>
                </Statistic>
                <Statistic className="list-values" size='mini'>
                    <Statistic.Value className="li-val">{buyVal}</Statistic.Value>
                </Statistic>
                <Statistic className="list-values" size='mini'>
                    <Statistic.Value className="li-val">{currentVal}</Statistic.Value>
                </Statistic>
                <Statistic className="list-values" size='mini'>
                    <Statistic.Value className="li-val">{(props.buyObject.buySize*currentVal).toFixed(2)}</Statistic.Value>
                </Statistic>
                    { profit ? (
                        <Statistic className="list-values" size='mini'>
                            <Statistic.Value>+{profitPrecentage}% <Icon color='green' name='angle up' /></Statistic.Value>
                        </Statistic>
                    )
                    :(
                        <Statistic className="list-values" size='mini'>
                            <Statistic.Value>-{profitPrecentage}% <Icon color='red' name='angle down' /></Statistic.Value>
                        </Statistic>
                    )}
            </Statistic>
        </div>
    )
}



