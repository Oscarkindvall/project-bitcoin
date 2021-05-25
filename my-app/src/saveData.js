import React, { useRef } from 'react';
import Portfolio from './portfolio';


const getPriceOnDate = async (date, amount) => {
    const res = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start='+date+'&end='+date);
    const data = await res.json();
 
    let buyDate = Object.keys(data.bpi);
    let bitcoinValue = Object.values(data.bpi);
    let buyAmount = parseInt(bitcoinValue) * amount;
    console.log(buyDate);
    console.log(buyAmount);
    
    return {buyDate, buyAmount, bitcoinValue}
  }


export function LoadData() {
    let portfolio= localStorage.getItem("portfolio");
    if(portfolio == null){
    //Exist data in local
        localStorage.setItem("portfolio", JSON.stringify([]));
        // Returnerar en tom lista (= inga todos)
        return [];
        
    }else{
    //Non Exist data block
        return JSON.parse(portfolio);
    }
}

export default function SaveData() {
      const dateRef = useRef();
      const amountRef = useRef();

      function addCoin(e) {
            // const newId = portfolio.length > 0 ? portfolio[portfolio.length - 1].id + 1 : 1;
            
            let priceResult = getPriceOnDate(dateRef.current.value, amountRef.current.value);
            priceResult.then(function(result) {
              let portfolio = LoadData();
              portfolio.push({date: result.buyDate[0], amount: result.buyAmount, bitcoinValue: result.bitcoinValue[0]});
              localStorage.setItem("portfolio", JSON.stringify(portfolio));
              console.log(portfolio)
            })
            amountRef.current.value = "";
            dateRef.current.value = "";
      }


    //   function deleteMovie(title) {
    //     const newList = portfolio.filter((movie) => movie.title !== title);
    
    //     setportfolio(newList);
    // }

     
        return (
          <>
            <div>
            <h1>Min filmlista</h1>
            <form id="log-buy" >
                <legend>Lägg till ett köp</legend>
            
                <input type="text" id="amount" className="form-control" placeholder="Amount..." ref={amountRef}/>
                <input type="text" id="date" className="form-control" placeholder="Date..." ref={dateRef}/>
                
            </form>
            <input onClick={addCoin} type="submit" className="btn btn-success mt-3" value="Registrera köp" />
            </div>
            
            <div> 
              {<Portfolio portfolio={LoadData()}/> }
            </div>
            </>
            )            
    }