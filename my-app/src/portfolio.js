import React, { useRef } from 'react';
import PurchaseList from './PurchaseList.js';

//   function loadData() {

//     let portfolio= localStorage.getItem("portfolio");
//     if(portfolio == null){
//     //Exist data in local
//         localStorage.setItem("portfolio", JSON.stringify([]));
//         // Returnerar en tom lista (= inga todos)
//         return [];
        
//     }else{
//     //Non Exist data block
//         return JSON.parse(portfolio);
//     }
// }

export default function Portfolio(props) {
    console.log(props);
    console.log(props.portfolio);
        return (
            <div>
            <h1>Mina köp</h1>

            {
            props.portfolio === [] ? (
            <p> Listan är tom </p>
            ):(
             <>
            <ul id="log-list" >

            { props.portfolio.map(buyObject => <PurchaseList buyObject={buyObject}/>) }
           
            </ul>
        
            <h1> HEj </h1>
            </>
            )
            }
            
            </div>
            
            )}

            
    
                // { props.portfolio.forEach(portfolioObject => {
                // document.getElementById("log-list").append(
                //     <li>
                //     {portfolioObject.date}
                //     {portfolioObject.amount}
                //     {portfolioObject.bitcoinValue}
                //     </li>
                // )
            
                // })
                // }