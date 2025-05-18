import React, { useEffect, useState } from 'react';
import articleService from '../../services/articleService';
import '../../styles/articles.css';

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 150)}...</p>
              <p>Статус: {article.reviewed ? 'готово' : 'не готово'}</p>
              {/* Здесь могут быть дополнительные элементы, например, кнопки редактирования */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyArticles;