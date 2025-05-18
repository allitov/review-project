// src/main/resources/static/src/components/article/ArticleItem.jsx
import React from 'react';

const ArticleItem = ({ article }) => {
  return (
    <div className="article-item">
      <h3>{article.title}</h3>
      <div className="article-content">
        {article.content.length > 200 
          ? article.content.substring(0, 200) + '...' 
          : article.content
        }
      </div>
      <div className="article-footer">
        <span>ID: {article.id}</span>
      </div>
    </div>
  );
};

export default ArticleItem;