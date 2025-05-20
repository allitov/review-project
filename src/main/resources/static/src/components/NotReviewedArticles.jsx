import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import ReviewForm from './ReviewForm';
import '../styles/articles.css';

function NotReviewedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/articles/not-reviewed', {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить статьи');
      }
      
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArticles();
  }, []);
  
  const handleReviewClick = (article) => {
    setSelectedArticle(article);
  };
  
  const handleCloseForm = () => {
    setSelectedArticle(null);
  };
  
  const handleReviewSuccess = () => {
    // Обновляем список статей после успешного создания рецензии
    fetchArticles();
  };
  
  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  
  return (
    <div className="articles-container">
      <h2>Статьи для рецензирования</h2>
      {articles.length === 0 ? (
        <p>Нет статей, требующих рецензирования.</p>
      ) : (
        <div className="articles-list">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              <p><strong>Автор:</strong> {article.authorName}</p>
              {/*<p><strong>Дата публикации:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>*/}
              <p>{article.content.substring(0, 150)}...</p>
              <button 
                className="btn primary"
                onClick={() => handleReviewClick(article)}
              >
                Рецензировать
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Модальное окно с формой рецензирования */}
      {selectedArticle && (
        <ReviewForm 
          article={selectedArticle} 
          onClose={handleCloseForm}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}

export default NotReviewedArticles;