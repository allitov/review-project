// src/main/resources/static/src/components/article/PublishArticle.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import articleService from '../../services/articleService';
import authService from '../../services/authService';
import '../../styles/articles.css';

const PublishArticle = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    authorId: currentUser?.id,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!articleData.title.trim()) {
      setError('Пожалуйста, укажите заголовок статьи');
      return;
    }
    
    if (!articleData.content.trim()) {
      setError('Пожалуйста, добавьте содержание статьи');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await articleService.createArticle(articleData);
      navigate('/my-articles');
    } catch (err) {
      setError('Не удалось опубликовать статью. Пожалуйста, попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-container">
      <h2>Опубликовать статью</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок</label>
          <input
            type="text"
            id="title"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            placeholder="Введите заголовок статьи"
            disabled={loading}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Содержание</label>
          <textarea
            id="content"
            name="content"
            value={articleData.content}
            onChange={handleChange}
            placeholder="Введите содержание статьи"
            rows={10}
            disabled={loading}
            className="form-control"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/my-articles')}
            disabled={loading}
            className="btn-secondary"
          >
            Отмена
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Публикация...' : 'Опубликовать'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishArticle;