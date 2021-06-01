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
                    <Statistic.Label className="portfolio-labels">Datum</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Antal</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Inköpskurs</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Nuvarande kurs</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> Nuvarande värde</Statistic.Label>
                    <Statistic.Label className="portfolio-labels"> +-%</Statistic.Label>
            </Statistic>
            { props.portfolio.map(buyObject => <PurchaseList buyObject={buyObject} currentBitcoinValue={props.price}/>) }
            </ul>
            </>
            )
            }
            
            </div>
            )}
