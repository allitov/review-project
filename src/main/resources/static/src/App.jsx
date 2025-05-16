// src/main/resources/static/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import authService from './services/authService';
import './App.css';
import './styles/common.css';

// Компонент для обработки выхода из системы
function Logout() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);
  
  return <div>Выход из системы...</div>;
}

// Компонент дашборда
function Dashboard() {
  const user = authService.getCurrentUser();
  
  return (
    <div className="page-container">
      <header className="dashboard-header">
        <h1>Научные Обзоры</h1>
        <div className="user-info">
          <span>Привет, {user?.fullName || 'Пользователь'}!</span>
          <a href="/logout" className="logout-link">Выйти</a>
        </div>
      </header>
      
      <UserProfile />
    </div>
  );
}

// Защищенный маршрут
const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;