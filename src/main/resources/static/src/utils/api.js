import authService from '../services/authService';

const BASE_URL = '/api/v1';

const apiRequest = async (endpoint, options = {}) => {
  const token = authService.getToken();

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

  if (response.status === 401) {
    authService.logout();
    window.location.href = '/login';
    throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Ошибка запроса: ${response.status}`);
  }

  if (options.method === 'DELETE') {
    return { success: true };
  }

  return await response.json();
};

const api = {
  get: (endpoint) => apiRequest(endpoint),

  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE'
  })
};

export default api;