import React, {useState} from 'react';


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
        <div>
          <article> 
            {console.log(props)}
            <div>{console.log(props.article)}</div>
            <div>{props.article.headline}</div>
            <div>{props.article.pubDate}</div>
            <div>{props.article.webUrl}</div>
            <div>{props.article.abstract}</div>
            <div>{props.article.articleImg}</div>
          </article>
        </div>
          </>
          )                
}

