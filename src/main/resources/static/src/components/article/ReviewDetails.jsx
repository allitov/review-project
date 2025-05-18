// ReviewDetails.jsx
import React, { useState, useEffect } from 'react';
import authService from '../../services/authService.js';
import '../ReviewForm.css';

function ReviewDetails({ articleId, onClose }) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/reviews/ready/${articleId}`, {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные рецензии');
        }
        
        const data = await response.json();
        setReview(data);
      } catch (err) {
        console.error('Error fetching review:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReview();
  }, [articleId]);
  
  if (loading) {
    return (
      <div className="review-form-overlay">
        <div className="review-form-container">
          <h2>Загрузка рецензии...</h2>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="review-form-overlay">
        <div className="review-form-container">
          <h2>Ошибка</h2>
          <p className="error-message">{error}</p>
          <div className="form-actions">
            <button 
              type="button" 
              className="btn secondary" 
              onClick={onClose}
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="review-form-overlay">
      <div className="review-form-container">
        <h2>Рецензия на статью</h2>
        
        <div className="article-info">
          <h3>{review.title}</h3>
          <p><strong>Автор:</strong> {review.authorName}</p>
          {/*<p><strong>Дата публикации:</strong> {new Date(review.article.createdAt).toLocaleDateString()}</p>*/}
          <div className="article-content">
            <p>{review.articleContent}</p>
          </div>
        </div>
        
        <div className="review-details">
          <div className="form-group">
            <label>Рейтинг:</label>
            <div className="review-value">{review.rating}/10</div>
          </div>
          
          <div className="form-group">
            <label>Комментарий:</label>
            <div className="review-value review-text">{review.comment}</div>
          </div>
          
          <div className="form-group">
            <label>Рекомендации:</label>
            <div className="review-value review-text">{review.recommendation}</div>
          </div>
          
          <div className="form-group">
            <label>Рецензент:</label>
            <div className="review-value">{review.reviewerName}</div>
          </div>
          
          {/*<div className="form-group">*/}
          {/*  <label>Дата рецензии:</label>*/}
          {/*  <div className="review-value">{new Date(review.createdAt).toLocaleDateString()}</div>*/}
          {/*</div>*/}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn primary" 
            onClick={onClose}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetails;