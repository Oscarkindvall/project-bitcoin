import React, {useState} from 'react';
import styles from './style.css';


let key = "EpxB0D2US4cMY5RWaAlssDVQ1SQ6nefh";
// pub_date	Timestamp (YYYY-MM-DD)
// let date = "2021-05-20"
// pub_date=2021-05-06


// const getArticle = async () => {
//     const res = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=bitcoin&sort=newest&api-key='+key);
//     const data = await res.json();
//     console.log(data);
//     const headline = data.response.docs[0].headline.main;
//     const pubDate = data.response.docs[0].pub_date;
//     const webUrl = data.response.docs[0].web_url;
//     const abstract = data.response.docs[0].abstract;
//     const articleImg = data.response.docs[0].multimedia[0].url;

//     return {headline,pubDate,webUrl,abstract,articleImg}
//   }


  
export default function Article(props) {
  console.log(props);
  const url = "http://www.nytimes.com/";

  // let article = [];

  // const [article, setArticle] = useState(
  //   {
  //     headline: "", 
  //     pubDate:  "",
  //     webUrl:  "", 
  //     abstract:  "",
  //     articleImg: ""
  //   }
  // );
  
  // function createArticle(result)  {
  //   return {
  //   headline: result.headline,
  //   pubDate: result.pubDate,
  //   webUrl: result.webUrl,
  //   abstract: result.abstract,
  //   articleImg: result.articleImg
  //   }
  // }
  

  // const fetchArticle = getArticle();
  // fetchArticle.then(function(result) {
    

  //   console.log(result);
  //   console.log(result.headline);
  //   console.log(result.articleImg);
  //   console.log(result.pubDate);
  //   console.log(result.webUrl);
  //   console.log(result.abstract);
  //   article.push(result);

  //   // for(let i=0;i<article.length;i++)
  //   // {
  //   // let articles = article[i];
  //   // return articles;
  //   // }

  //   // {}?

  //   // setArticle({
  //   //   headline: result.headline,
  //   //   pubDate: result.pubDate,
  //   //   webUrl: result.webUrl,
  //   //   abstract: result.abstract,
  //   //   articleImg: result.articleImg
  //   //   )}
  //   // let ar = result
  //   // return ar
  //   })

 
    
    // console.log(articles.headline);
    
    // console.log(article);
    // console.log(article.map(a => a.headline))
    // // console.log(ar);
    // console.log(article.headline);
    // // console.log(article.0);

   

    return ( 
        <>
        <div className="card">
          
          <h2>Most recent article on NY Times mentioning <img id="bitcoinImg" src="./images/bitcoin.png"></img> </h2>
          <article className="inner-card"> 
            {console.log(props)}
            <div>{console.log(props.article)}</div>
            <img id="NYT" src="./images/The_New_York_Times_logo.png"></img>
            <div><h3>{props.article.headline}</h3></div>
            
            
            <div><p>{props.article.abstract}</p></div>
            <div><img src={url + props.article.articleImg}></img></div>
            <div><p><strong>Publication date:</strong> {props.article.pubDate.slice(0,10)} </p></div>
            <div><a href={props.article.webUrl}>Read more... </a></div>
            {/* <div><img src={url + props.article.articleImg}</img></div> */}
          </article>
        </div>
          </>
          )                
}

