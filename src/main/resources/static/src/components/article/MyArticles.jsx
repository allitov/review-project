// src/main/resources/static/src/components/article/MyArticles.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articleService from '../../services/articleService';
import authService from '../../services/authService';
import ArticleItem from './ArticleItem';
import '../../styles/articles.css';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentUser = authService.getCurrentUser();
  const authorId = currentUser?.id;

  useEffect(() => {
    const fetchArticles = async () => {
      if (!authorId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await articleService.getArticlesByAuthor(authorId);
        setArticles(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить статьи. Пожалуйста, попробуйте позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [authorId]);

  return (
    <div className="article-container">
      <div className="articles-header">
        <h2>Мои статьи</h2>
        <Link to="/publish-article" className="btn-primary">
          Опубликовать новую статью
        </Link>
      </div>

      {loading && <div className="loading-indicator">Загрузка статей...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && articles.length === 0 && (
        <div className="empty-state">
          <p>У вас пока нет опубликованных статей.</p>
          <Link to="/publish-article" className="btn-primary">Опубликовать первую</Link>
        </div>
      )}
      
      <div className="articles-list">
        {articles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default MyArticles;