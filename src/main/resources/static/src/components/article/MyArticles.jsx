import React, { useEffect, useState } from 'react';
import articleService from '../../services/articleService';
import ReviewDetails from './ReviewDetails';
import '../../styles/articles.css';

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        setLoading(true);
        const response = await articleService.getCurrentUserArticles();
        setArticles(response.articles);
      } catch (error) {
        setError('Не удалось загрузить статьи: ' + error.message);
        console.error('Ошибка при загрузке статей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, []);

  const handleViewReview = (articleId) => {
    setSelectedArticleId(articleId);
  };

  const handleCloseReview = () => {
    setSelectedArticleId(null);
  };

  if (loading) return <div>Загрузка статей...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="my-articles">
      <h2>Мои статьи</h2>
      {articles.length === 0 ? (
        <p>У вас пока нет статей</p>
      ) : (
        <div className="articles-list">
          {articles.map(article => (
            <div className="article-card" key={article.id}>
              <h3>
                {article.title}
                <span className={`ready-badge ${article.reviewed}`}>
                  {article.reviewed ? 'готово' : 'не готово'}
                </span>
              </h3>
              <p>{article.content.substring(0, 150)}...</p>
              <div className="article-actions">
                {article.reviewed && (
                  <button 
                    className="btn primary"
                    onClick={() => handleViewReview(article.id)}
                  >
                    Посмотреть рецензию
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно для просмотра рецензии */}
      {selectedArticleId && (
        <ReviewDetails 
          articleId={selectedArticleId} 
          onClose={handleCloseReview} 
        />
      )}
    </div>
  );
}

export default MyArticles;