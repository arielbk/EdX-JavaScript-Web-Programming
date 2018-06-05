class ArticlesGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "0cf35b81444044feb361d859d43be976"
        });

    $.getJSON(url, function(data, status){
      return this.setState({articles: this.parse(data)});
    }.bind(this));
  }

  parse(results) {
    if (!results || !results.response) return [];
    var articles = results.response.docs;
    var parsedArticles = [];
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      if (article.multimedia.find(this.isXL)) {
        parsedArticles.push({
          id:       article._id,
          title:    article.headline.main || 'Untitled',
          imageURL: article.multimedia.find(this.isXL).url || '#',
          webURL:   article.web_url || '#'
        });
      }
    }
    return parsedArticles;
  }

  isXL(image) {
    return image.subtype === 'xlarge';
  }

  render() {
    return this.state.articles && (
      <div className='articles'>
        { this.state.articles.map( function(article) {
            return <Article article={article} key={article._id} />;
        })}
      </div>
    );
  }
}

var Article = function({article}) {
  var imgURL = 'https://stat01.nyt.com/' + article.imageURL;
  return(
    <div className='article'>
      <a className='article-link' href={article.webURL}>
        <img className='article-image'
              title={article.title}
              src={imgURL} />
      </a>
    </div>
  );
}
