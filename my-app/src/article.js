import React, {useState} from 'react';



let key = "rb0nYhAxUturfu9NzO9OJyq5kCa3N2gh";
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

  const articleCollection = []

  // const [article, setArticle] = useState(
  //   articleCollection
  // );

  const fetchArticle = getArticle();
  fetchArticle.then(function(result) {
    articleCollection.push(result);
        console.log(result);
  });

  

  // fetchArticle.then(function(result) {
  //   setArticle([...articleCollection, {
  //     headline: "", 
  //     pubDate:  "",
  //     webUrl:  "", 
  //     abstract:  "",
  //     articleImg: ""
  //   }])
  // })

  // setArticle([...articleCollection, {
  //   headline: articleCollection.headline 
  // }]);

  // setArticle([articleCollection]);

  console.log(articleCollection)

  
  
  // function createArticle(result)  {
  //   return {
  //   headline: result.headline,
  //   pubDate: result.pubDate,
  //   webUrl: result.webUrl,
  //   abstract: result.abstract,
  //   articleImg: result.articleImg
  //   }
  // }

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
          {/* {console.log(articleCollection)} */}
        <div>
          <article> 
           <div> {console.log(articleCollection)} </div>
          
           {/* <div> {article.headline} </div>
           <div> {article.abstract} </div>
           <div> {artiscle.pubDate} </div>
           <div> {article.articleImg} </div>
           <div> {article.webUrl} </div> */}
          </article>
        </div>
          </>
          )            
}




