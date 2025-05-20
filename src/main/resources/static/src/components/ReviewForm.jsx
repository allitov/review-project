import React, { useState } from 'react';
import authService from '../services/authService.js';
import './ReviewForm.css';

function ReviewForm({ article, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    articleId: article.id,
    reviewerId: authService.getCurrentUser().userId,
    rating: 5,
    comment: '',
    recommendation: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Не удалось отправить рецензию');
      }

      onSuccess && onSuccess();
      onClose();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="review-form-overlay">
      <div className="review-form-container">
        <h2>Рецензирование статьи</h2>
        
        <div className="article-info">
          <h3>{article.title}</h3>
          <p><strong>Автор:</strong> {article.authorName}</p>
          <p><strong>Дата публикации:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
          <div className="article-content">
            <p>{article.content}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Рейтинг (1-10):</label>
            <input 
              type="number" 
              id="rating" 
              name="rating" 
              min="1" 
              max="10" 
              value={formData.rating} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Комментарий:</label>
            <textarea 
              id="comment" 
              name="comment" 
              value={formData.comment} 
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="recommendation">Рекомендации:</label>
            <textarea 
              id="recommendation" 
              name="recommendation" 
              value={formData.recommendation} 
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="btn primary" 
              disabled={loading}
            >
              {loading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;