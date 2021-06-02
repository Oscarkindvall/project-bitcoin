import React, { useRef } from 'react';
import PurchaseList from './PurchaseList.js';
import { Statistic } from 'semantic-ui-react'


export default function Portfolio(props) {
    console.log(props);
    console.log(props.portfolio);
        return (
            <div className="portfolio-container">    
            {
            props.portfolio === [] ? (
            <p> Listan är tom, lägg till ett tidigare köp via formuläret ovan</p>
            ):(
             <>
            <div id="log-list" >
                <p className="portfolio-labels"> Date</p>
                <p className="portfolio-labels"> Amount</p>
                <p className="portfolio-labels"> Purchase stock price $</p>
                <p className="portfolio-labels"> Current stock price $</p>
                <p className="portfolio-labels"> Total value $</p>
                <p className="portfolio-labels"> +-%</p>
            </div>
            { props.portfolio.map(buyObject => <PurchaseList buyObject={buyObject} currentBitcoinValue={props.price}/>) }
            </>
            )
            }
            
            </div>
            )}
