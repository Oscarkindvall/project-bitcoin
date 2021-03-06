import React, { useRef, useState} from 'react';
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
  
  return {buyDate, buyAmount, bitcoinValue, buySize}
}
  

export function LoadData() {
  let localPortfolio= localStorage.getItem("portfolio");
  if(localPortfolio == null){
      localStorage.setItem("portfolio", JSON.stringify([]));
      return []; 
  }else{
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

    const amountRef = useRef();
    const [startDate, setCurrentDate] = useState(new Date());
    const [id, setId] = useState(portfolio.length);
    
    function formatDate(date) {
      JSON.stringify(date);
      let str = JSON.stringify(date);
      let dateArray = [];
      dateArray = str.split(' ').map(function (word) {
        return word
      })
      const newDate = dateArray[0].slice(1,11)
      setCurrentDate(newDate)
      return newDate
    }

  function addCoin(e) {
    if (isNaN(parseInt(amountRef.current.value)) !== true) {
      if (parseInt(amountRef.current.value) !== 0) {
        if (startDate !== formatDate(new Date())) {
          function saveToLocal(result) {
          let Local = LoadData();
          Local.push({id: id+1, date: result.buyDate[0], amount: result.buyAmount, buySize: result.buySize, bitcoinValue: result.bitcoinValue[0]});
          localStorage.setItem("portfolio", JSON.stringify(Local));
          }

          let priceResult = getPriceOnDate(startDate, amountRef.current.value);
          priceResult.then(function(result) {
            saveToLocal(result)
            setPortfolio([...portfolio, {
              id: id+1,
              date: result.buyDate[0], 
              amount: result.buyAmount,
              buySize: result.buySize, 
              bitcoinValue: result.bitcoinValue[0]
            }]);
          })
            amountRef.current.value = "";
            setId(id+1);
          }
          else {alert("Todays history price is'nt available yet... Please choose an earlier date than today.")}
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
          <div className="ui right labeled input form-inputs">
            <input type="text" id="amount" className="form-control" placeholder="Amount..." ref={amountRef}/>
            <div className="ui basic label">
                Bitcoin
            </div>
          </div>

          <div className="ui right labeled input">
            <div className="ui basic label">
                Date
            </div>
            <DatePicker maxDate={moment().toDate()} selected={new Date()} onChange={date => formatDate(date)} />
          </div>

      </form>
      <input onClick={addCoin} type="submit" className="btn btn-success mt-3 ui inverted green button form-submit" value="Registrera köp" />
      </div>

      <div> 
        < div className="portContanier">
          {<Portfolio portfolio={portfolio} price={props.price}/> }
        </div>
      </div>
      </>
      )            
}


