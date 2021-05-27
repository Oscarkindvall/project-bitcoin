import React, {useState} from 'react';


let key = "EpxB0D2US4cMY5RWaAlssDVQ1SQ6nefh";
// pub_date	Timestamp (YYYY-MM-DD)
// let date = "2021-05-20"
// pub_date=2021-05-06


const getArticle = async () => {
    const res = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=bitcoin&sort=newest&api-key='+key);
    const data = await res.json();
    console.log(data);
    const headline = data.response.docs[0].headline.main;
    const pubDate = data.response.docs[0].pub_date;
    const webUrl = data.response.docs[0].web_url;
    const abstract = data.response.docs[0].abstract;
    const articleImg = data.response.docs[0].multimedia[0].url;

    return {headline,pubDate,webUrl,abstract,articleImg}
  }

  
  
export default function Article() {

  const [article, setArticle] = useState(null);

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

  const fetchArticle = getArticle();
  fetchArticle.then(function(result) {

    console.log(result);
    console.log(result.headline);
    console.log(result.articleImg);
    console.log(result.pubDate);
    console.log(result.webUrl);
    console.log(result.abstract);

    setArticle(result.headline);

    // {}?

    // setArticle({
    //   headline: result.headline,
    //   pubDate: result.pubDate,
    //   webUrl: result.webUrl,
    //   abstract: result.abstract,
    //   articleImg: result.articleImg
    //   )}
    })
    
    console.log(article);
    return (
        <>
    {/* <div class="card">
        <h5 class="card-header">Bitcoin news</h5>
        <div class="card-body">
          <p class="card-text">Latest articles on NY times regarding Bitcoin</p>

        </div>
      </div>
          <div>
          <h2>Articles</h2>  
          </div> */}
        <div>
          <article> 
           <div> {article} </div>
           {/* <div> {article.headline} </div>
           <div> {article.abstract} </div>
           <div> {article.pubDate} </div>
           <div> {article.articleImg} </div>
           <div> {article.webUrl} </div> */}
          </article>
        </div>
          </>
          )            
}




