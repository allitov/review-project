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
    
    // Добавляем ID пользователя в данные статьи
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
}
};

export default articleService;