// src/main/resources/static/src/services/userService.js
const API_URL = '/api/v1/users/';

const userService = {
  // Получение данных пользователя
  getUserById: async (userId) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(API_URL + userId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Ошибка при получении данных пользователя');
    }
    
    return await response.json();
  },
  
  // Обновление данных пользователя
  updateUser: async (userId, userData) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(API_URL + userId, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Ошибка при обновлении данных пользователя');
    }
    
    return await response.json();
  },
};

export default userService;