import React, {useState, useEffect} from "react";
import { Dimmer, Loader, Select, Card} from 'semantic-ui-react';
import Chart from "react-apexcharts";
import SaveData from './saveData';
import Article from './article';

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
  const [article, setArticle] = useState(null);
  let num = 0;

  function checkLoading() {
    num+=1
    num > 1 ? setLoad(false) : console.log("only 1 load done")
  } 

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await res.json();
      console.log(data)
      console.log(data.bpi)
      setPrice(data.bpi);
      getChartData(currency);
      getArticle();
    }
    fetchData();
  }, []);

  const handleSelect = (e, data) => {
    setCurrency(data.value);
    getChartData(data.value);
  }

  const getChartData = async (chartCurrency) => {
    const res = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+chartCurrency)
    const data = await res.json();
    console.log(data)
    const categories = Object.keys(data.bpi); //Turn it into an array of Keys.
    const series = Object.values(data.bpi);
    console.log(categories)
    console.log(series)

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
    checkLoading();
  }

  const getArticle = async()=> {
    const res = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=bitcoin&sort=newest&api-key=EpxB0D2US4cMY5RWaAlssDVQ1SQ6nefh');
    const data = await res.json();
    console.log(data);
    const headline = data.response.docs[0].headline.main;
    const pubDate = data.response.docs[0].pub_date;
    const webUrl = data.response.docs[0].web_url;
    const abstract = data.response.docs[0].abstract;
    const articleImg = data.response.docs[0].multimedia[0].url;

    setArticle({
      headline: headline,
      pubDate: pubDate,
      webUrl: webUrl,
      abstract: abstract,
      articleImg: articleImg
    })
    checkLoading();
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
            <>
            <div className="price-container">
              <Select placeholder="Select currency" 
              onChange={handleSelect} 
              options={options}
              ></Select>

              <Card className="currency-card">
                <Card.Content>
                  <Card.Header>{currency}</Card.Header>
                  <Card.Description>{price[currency].rate}</Card.Description>
                </Card.Content>
              </Card>

              <Chart className="chart-visuals" options={chartData}
                series={series}
                type="line"
                width="100%"
                height="300"/>
            </div>
            
            <div>
              <SaveData price={price}/> 
            </div>            
            
            <div>
              <Article article={article} /> 
            </div>
            </>
          )
        }
    </div>
  );
}

export default App;