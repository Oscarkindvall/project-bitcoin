import React, { useRef } from 'react';
import PurchaseList from './PurchaseList.js';
import { Statistic } from 'semantic-ui-react'


export default function Portfolio(props) {
    console.log(props);
    console.log(props.portfolio);
        return (
            <div>
                 
            <h3>Tidigare köp</h3>

            {
            props.portfolio === [] ? (
            <p> Listan är tom, lägg till ett tidigare köp via formuläret ovan</p>
            ):(
             <>
            <ul id="log-list" >
            <Statistic className="portfolio-grid" horizontal>
                    <Statistic.Label>Datum</Statistic.Label>
                    <Statistic.Label>Antal</Statistic.Label>
                    <Statistic.Label>Inköpskurs</Statistic.Label>
                    <Statistic.Label>Nuvarande kurs</Statistic.Label>
                    <Statistic.Label>Nuvarande värde</Statistic.Label>
                    <Statistic.Label>+-%</Statistic.Label>
            </Statistic>
            { props.portfolio.map(buyObject => <PurchaseList buyObject={buyObject} currentBitcoinValue={props.price}/>) }
            </ul>
            </>
            )
            }
            
            </div>
            )}
