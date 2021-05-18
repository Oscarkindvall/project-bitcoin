import React, {useState, useEffect} from "react";
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {

const [load, setLoad] = useState(true);
const [price, setPrice] = useState(null);
const [currency, setCurrency] = useState("USD");


useEffect(() => {
  async function fetchData() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const data = await res.json();
    console.log(res)
    console.log(data)
    console.log(data.bpi)
    setPrice(data.bpi);
    setCurrency("EUR");
    setLoad(false);
  }
  fetchData();
}, []);

  // const handleSelect = (e, data) => {
  //   setCurrency(data.value);
  // }

  return (

    <div className="App">
      <h1>Bitcoin Diary</h1>
        {
          load ? (
            <div>
            <Dimmer active inverted>
              <Loader>
                Loading
              </Loader>
            </Dimmer>
            </div>
          ) : (
            <div className="price-container">
              <h1>{currency}</h1>
              <h2>{price[currency].rate}</h2>
            </div>
          )
        }
    </div>
  );
}

export default App;
