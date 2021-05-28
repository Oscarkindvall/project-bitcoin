import React, { useRef, useState} from 'react';
import Portfolio from './portfolio';



const getPriceOnDate = async (date, amount) => {
    const res = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start='+date+'&end='+date);
    const data = await res.json();
 
    let buyDate = Object.keys(data.bpi);
    let bitcoinValue = Object.values(data.bpi);
    let buySize = amount;
    let buyAmount = parseInt(bitcoinValue) * amount;
    console.log(buyDate);
    console.log(buyAmount);
    
    return {buyDate, buyAmount, bitcoinValue, buySize}
  }
  

export function LoadData() {
    let savedPortfolio = localStorage.getItem("portfolio");
    if(savedPortfolio == null){
    //Exist data in local
      savedPortfolio.setItem("portfolio", JSON.stringify([]));
        // Returnerar en tom lista (= inga todos)
        return [];
        
    }else{
    //Non Exist data block
        return JSON.parse(savedPortfolio);
    }
}

export default function SaveData() {
    let localPortfolio = []
    

    LoadData().forEach(portObject => {
      // Loops through each object from storage
      localPortfolio.push(portObject)
    });
    
    const [portfolio, setPortfolio] = useState(
      // Declares localStorage object values as default for portfolio
      localPortfolio
    );
    console.log(portfolio)

    const dateRef = useRef();
    const amountRef = useRef();

    function addCoin(e) {
          // const newId = portfolio.length > 0 ? portfolio[portfolio.length - 1].id + 1 : 1;
          function saveToLocal(result) {
            let Local = LoadData();
            Local.push({date: result.buyDate[0], amount: result.buyAmount, buySize: result.buySize, bitcoinValue: result.bitcoinValue[0]});
            localStorage.setItem("portfolio", JSON.stringify(Local));
          }

          let priceResult = getPriceOnDate(dateRef.current.value, amountRef.current.value);
          priceResult.then(function(result) {
            saveToLocal(result)
            setPortfolio([...portfolio, {
              date: result.buyDate[0], 
              amount: result.buyAmount,
              buySize: result.buySize, 
              bitcoinValue: result.bitcoinValue[0]
            }]);
          })
        amountRef.current.value = "";
        dateRef.current.value = "";  
    }

        return (
          <>
            <div>
            <h2></h2>
            <form id="log-buy" >
                <legend>Lägg till ett köp</legend>
            
                <input type="text" id="amount" className="form-control" placeholder="Amount..." ref={amountRef}/>
                <input type="text" id="date" className="form-control" placeholder="Date..." ref={dateRef}/>
                
            </form>
            <input onClick={addCoin} type="submit" className="btn btn-success mt-3" value="Registrera köp" />
            </div>
           
            
            <div> 
              {<Portfolio portfolio={portfolio}/> }
            </div>
            </>
            )            
    }