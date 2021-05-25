import React, { useRef } from 'react';
import PurchaseList from './PurchaseList.js';

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
            { props.portfolio.map(buyObject => <PurchaseList buyObject={buyObject}/>) }
            </ul>
            </>
            )
            }
            
            </div>
            )}
