// src/main/resources/static/src/services/authService.js
// Сервис для работы с аутентификацией

// Обратите внимание, что URL изменился в соответствии с бэкенд-контроллером
const API_URL = '/api/v1/auth/';

const authService = {
  // Вход пользователя
  login: async (email, password) => {
    const response = await fetch(API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Формируем объект в соответствии с AuthRequest
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Ошибка при входе');
    }
    
    const data = await response.json();
    
    // Сохраняем токен и данные пользователя
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  },
  
  // Регистрация пользователя
  register: async (firstname, lastname, email, password) => {
    const response = await fetch(API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Формируем объект в соответствии с RegisterRequest
      body: JSON.stringify({ 
        firstname, 
        lastname,
        email, 
        password 
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Ошибка при регистрации');
    }
    
    const data = await response.json();
    
    // Можно также сохранить токен сразу после регистрации,
    // если бэкенд возвращает его (как в вашем случае)
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  },
  
  // Выход пользователя
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Получение текущего пользователя
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Проверка, авторизован ли пользователь
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Получение токена для аутентификации запросов
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;