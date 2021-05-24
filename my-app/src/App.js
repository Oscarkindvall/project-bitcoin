import React, {useState, useEffect} from "react";
import { Dimmer, Loader, Select, Card} from 'semantic-ui-react';
import Chart from "react-apexcharts";

const options = [
{value: "USD", text: "USD"},
{value: "EUR", text: "EUR"},
{value: "GBP", text: "GBP"}
]

function App() {

const [load, setLoad] = useState(true);
const [price, setPrice] = useState(null);
const [currency, setCurrency] = useState("USD");
const [chartData, setChartData] = useState(null);
const [series, setSeries] = useState(null);


useEffect(() => {
  async function fetchData() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const data = await res.json();
    console.log(res)
    console.log(data)
    console.log(data.bpi)
    setPrice(data.bpi);
    setCurrency("EUR");
    getChartData();
  }
  fetchData();
}, []);

  const handleSelect = (e, data) => {
    setCurrency(data.value);
  }

  const getChartData = async () => {
    const res = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
    const data = await res.json();
    const categories = Object.keys(data.bpi); //Turn it into an array of Keys.
    const series = Object.values(data.bpi);
    setChartData({
      xaxis: {
        categories:categories
      }
    })

    setSeries([
      {
      name: "Bitcoin Price",
      data: series
      }
    ])

    setLoad(false);

  }

   
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
              <Select placeholder="Select currency" 
              onChange={handleSelect} 
              options={options}
              ></Select>

              <Card>
                <Card.Content>
                  <Card.Header>{currency}</Card.Header>
                  <Card.Description>{price[currency].rate}</Card.Description>
                </Card.Content>

              </Card>

              <Chart options={chartData}
              series={series}
              type="line"
              width="1200"
              height="300"/>

            </div>
          )
        }
    </div>
  );
}

export default App;