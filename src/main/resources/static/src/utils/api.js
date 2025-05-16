// src/main/resources/static/src/utils/api.js
import authService from '../services/authService';

// Базовый URL для всех API запросов
const BASE_URL = '/api/v1';

// Функция для создания запросов с авторизационным заголовком
const apiRequest = async (endpoint, options = {}) => {
  const token = authService.getToken();
  
  // Добавляем заголовок авторизации, если есть токен
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  
  const config = {
    ...options,
    headers
  };
  
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  // Проверка на 401 (Unauthorized) - перенаправление на логин
  if (response.status === 401) {
    authService.logout();
    window.location.href = '/login';
    throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
  }
  
  // Если ответ не OK (200-299), генерируем ошибку
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Ошибка запроса: ${response.status}`);
  }
  
  // Для DELETE запросов может не быть тела ответа
  if (options.method === 'DELETE') {
    return { success: true };
  }
  
  // Для остальных запросов парсим JSON
  return await response.json();
};

// Объект с методами для API запросов
const api = {
  // GET запрос
  get: (endpoint) => apiRequest(endpoint),
  
  // POST запрос
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  // PUT запрос
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // DELETE запрос
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE'
  })
};

export default api;