// src/main/resources/static/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import authService from './services/authService';
import './App.css';

// Компонент для обработки выхода из системы
function Logout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);
  
  return <div>Выход из системы...</div>;
}

// Защищенный компонент дашборда (как пример)
function Dashboard() {
  const user = authService.getCurrentUser();
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Личный кабинет</h1>
        <div className="user-info">
          <span>Привет, {user?.firstname || 'Пользователь'}!</span>
          <a href="/logout" className="logout-link">Выйти</a>
        </div>
      </header>
      
      <div className="dashboard-content">
        <h2>Ваш профиль</h2>
        <div className="profile-info">
          <p><strong>Имя:</strong> {user?.firstname}</p>
          <p><strong>Фамилия:</strong> {user?.lastname}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
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