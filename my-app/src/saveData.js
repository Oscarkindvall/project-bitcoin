import React, { useRef, useState} from 'react';
import Portfolio from './portfolio';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';



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
    let localPortfolio= localStorage.getItem("portfolio");
    if(localPortfolio == null){
    //Exist data in local
        localStorage.setItem("portfolio", JSON.stringify([]));
        // Returnerar en tom lista (= inga todos)
        return [];
        
    }else{
    //Non Exist data block
        return JSON.parse(localPortfolio);
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
   
    const dateRef = useRef();
    const amountRef = useRef();
    // const [startDate, setStartDate] = useState(new Date());
    
    
    const [startDate, setStartDate] = useState(new Date("2021-05-11"));

   
    
    

    function addCoin(e) {
          // const newId = portfolio.length > 0 ? portfolio[portfolio.length - 1].id + 1 : 1;
          function saveToLocal(result) {
            let Local = LoadData();
            Local.push({date: result.buyDate[0], amount: result.buyAmount, buySize: result.buySize, bitcoinValue: result.bitcoinValue[0]});
            localStorage.setItem("portfolio", JSON.stringify(Local));
          }

          // let newDate = startDate.format("YYYY-MM-DD")
          // console.log(newDate);

   
          // TODODOODODODODODO
          console.log(startDate);
          console.log(dateRef.value);
          console.log(dateRef.current.value);
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
                {/* Add className="ui input error" when wrong input */}
                <div class="ui right labeled input">
                  <input type="text" id="amount" className="form-control" placeholder="Amount..." ref={amountRef}/>
                  <div class="ui basic label">
                      USD
                  </div>
                </div>
                <DatePicker selected={startDate} dateFormat="yyyy-mm-dd" onChange={(date) => setStartDate(date)} ref={dateRef} />
            </form>
            <input onClick={addCoin} type="submit" className="btn btn-success mt-3 ui inverted green button" value="Registrera köp" />
            </div>

            
            <div> 
              {<Portfolio portfolio={portfolio}/> }
            </div>
            </>
            )            
    }

    
   