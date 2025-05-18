// MyReviews.jsx
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../styles/articles.css';

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) return;
        
        const response = await fetch(`/api/v1/reviews/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить рецензии');
        }
        
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  
  return (
    <div className="articles-container">
      <h2>Мои рецензии</h2>
      {reviews.length === 0 ? (
        <p>У вас пока нет рецензий.</p>
      ) : (
        <div className="articles-list">
          {reviews.map(review => (
            <div key={review.id} className="article-card">
              <h3>{review.articleTitle}</h3>
              <p><strong>Автор статьи:</strong> {review.authorName}</p>
              <p><strong>Рейтинг:</strong> {review.rating}</p>
              <p><strong>Комментарий:</strong> {review.comment}</p>
              <p><strong>Рекомендации:</strong> {review.recommendation}</p>
              {/*<p><strong>Дата рецензии:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReviews;