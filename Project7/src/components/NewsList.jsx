import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles');
        console.log('API Response:', response.data.results);
        setArticles(response.data.results);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading news...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Latest News</h3>
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              {article.image_url && (
                <img src={article.image_url} className="card-img-top" alt="news" />
              )}
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.summary}</p>
                <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
