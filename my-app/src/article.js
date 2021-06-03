
export default function Article(props) {
  const url = "http://www.nytimes.com/";
  
    return ( 
        <>
        <div className="card">
          <h2>Most recent article on NY Times mentioning <img id="bitcoinImg" src="./images/bitcoin.png" alt="bitcoin logo"></img> </h2>
          <article className="inner-card"> 
            <img id="NYT" src="./images/The_New_York_Times_logo.png" alt="NY-Times logo"></img>
            <div><h3>{props.article.headline}</h3></div>
            <div><p>{props.article.abstract}</p></div>
            <div><img src={url + props.article.articleImg} alt={props.article.headline}></img></div>
            <div><p><strong>Publication date:</strong> {props.article.pubDate.slice(0,10)} </p></div>
            <div><a href={props.article.webUrl} target="_blank" rel="noreferrer noopener">Read more... </a></div>
          </article>
        </div>
          </>
          )                
}

