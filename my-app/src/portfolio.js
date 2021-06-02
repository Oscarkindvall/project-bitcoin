import React, { useRef } from 'react';
import PurchaseList from './PurchaseList.js';
import { Statistic } from 'semantic-ui-react'


export default function Portfolio(props) {
    console.log(props);
    console.log(props.portfolio);
        return (
            <div>    
            {
            props.portfolio === [] ? (
            <p> Listan är tom, lägg till ett tidigare köp via formuläret ovan</p>
            ):(
             <>
            <ul id="log-list" >
            <Statistic className="portfolio-grid" horizontal>
                    <Statistic.Label className="portfolio-labels"> Date</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Amount</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Purchase stock price $</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Current stock price $</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Total value $</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> +-%</Statistic.Label>
            </Statistic>
            { props.portfolio.map(buyObject => <PurchaseList buyObject={buyObject} currentBitcoinValue={props.price}/>) }
            </ul>
            </>
            )
            }
            
            </div>
            )}
