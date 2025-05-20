const API_URL = '/api/v1/articles';

const articleService = {
  async getArticlesByAuthor(authorId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${authorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при получении статей');
      }
      
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error('Ошибка при получении статей:', error);
      throw error;
    }
  },

async createArticle(articleData) {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    articleData.authorId = user.userId;
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData),
    });
    
    if (!response.ok) {
      throw new Error('Ошибка при создании статьи');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при создании статьи:', error);
    throw error;
  }
},

async getCurrentUserArticles() {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.userId) {
      throw new Error('Пользователь не авторизован или отсутствует ID пользователя');
    }

    const response = await fetch(`${API_URL}/${user.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Ошибка при получении статей пользователя');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении статей пользователя:', error);
    throw error;
  }
}
};

export default articleService;