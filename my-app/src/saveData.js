import React, { useRef, useState} from 'react';
import Portfolio from './portfolio';
import DatePicker from "react-datepicker";
import moment from 'moment';
import format from 'date-fns/format';


import "react-datepicker/dist/react-datepicker.css";




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
   
    // const dateRef = useRef();
    const amountRef = useRef();
    // const [startDate, setStartDate] = useState(new Date());
    
    
    // const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate);

    
      const [startDate, setCurrentDate] = useState(new Date());
      console.log(startDate);
      
      function formatDate(date) {
        // console.log(format(date, 'yyyy-LL-dd')); // 2019-08-23


        console.log(date)
        JSON.stringify(date);
        console.log(date)
        let str = JSON.stringify(date);
        let dateArray = [];
        dateArray = str.split(' ').map(function (word) {
          return word
        })
        const newDate = dateArray[0].slice(1,11)
        console.log(newDate)
        setCurrentDate(newDate)
      
      //   // date.slice(4, 15);
      //   console.log(date)
      //   setCurrentDate(date)
      //   // console.log(format(new Date(), 'yyyy-LL-dd')); // 2019-08-23
      }
      
      

  
    
    

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
          // console.log(dateRef.value);
          // console.log(dateRef.current.value);
          let priceResult = getPriceOnDate(startDate, amountRef.current.value);
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
        // dateRef.current.value = "";  
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
                <DatePicker selected={new Date()} onChange={date => formatDate(date)} />
                
                {/* <DatePicker 
                format="YYYY - MM - dd"  id="datepicker" selected={startDate} onChange={(date) => setStartDate(date)}
                /> */}
            </form>
            <input onClick={addCoin} type="submit" className="btn btn-success mt-3 ui inverted green button" value="Registrera köp" />
            </div>

            
            <div> 
              {<Portfolio portfolio={portfolio}/> }
            </div>
            </>
            )            
    }

    
   