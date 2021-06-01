import React, { useRef, useState} from 'react';
import { Statistic } from 'semantic-ui-react'
import Portfolio from './portfolio';
import DatePicker from "react-datepicker";
import moment from 'moment';
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

export default function SaveData(props) {
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

      // const today = moment();
      // const disableFutureDate = current => {
      // return current.isBefore(today)
      // }
      
      function formatDate(date) {
        // console.log(format(date, 'yyyy-LL-dd')); // 2019-08-23
        // const dateTime = datetime.now();


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
        if(newDate > new Date) {
          alert("nej");
        } else {
          setCurrentDate(newDate)
        }
        
      
      //   // date.slice(4, 15);
      //   console.log(date)
      //   setCurrentDate(date)
      //   // console.log(format(new Date(), 'yyyy-LL-dd')); // 2019-08-23
      }


    function addCoin(e) {
      
      if (isNaN(parseInt(amountRef.current.value)) != true) {
        if (parseInt(amountRef.current.value) != 0) {
          function saveToLocal(result) {
            let Local = LoadData();
            Local.push({date: result.buyDate[0], amount: result.buyAmount, buySize: result.buySize, bitcoinValue: result.bitcoinValue[0]});
            localStorage.setItem("portfolio", JSON.stringify(Local));
          }

          console.log(startDate);
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
        }
        else {alert("Amount of Bitcoins has to be above 0")}
      }
      else {alert("Amount of Bitcoins has to be inserted as a number")}
    }
          

        return (
          <>
            <div>
            <h2>Bitcoin Portfolio</h2>
            <form id="log-buy" >
                {/* Add className="ui input error" when wrong input */}
                <div class="ui right labeled input form-inputs">
                  <input type="text" id="amount" className="form-control" placeholder="Amount..." ref={amountRef}/>
                  <div class="ui basic label">
                      Bitcoin
                  </div>
                </div>

                <div class="ui right labeled input">
                  <div class="ui basic label">
                      Date
                  </div>
                </div>

                <DatePicker maxDate={moment().toDate()} selected={new Date()} onChange={date => formatDate(date)} />
            </form>
            <input onClick={addCoin} type="submit" className="btn btn-success mt-3 ui inverted green button form-submit" value="Registrera köp" />
            </div>

            
            <div> 
              {<Portfolio portfolio={portfolio} price={props.price}/> }
            </div>
            </>
            )            
    }

    
   