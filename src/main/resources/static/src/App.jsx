import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import MyArticles from './components/article/MyArticles';
import PublishArticle from './components/article/PublishArticle';
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

// Компонент навигации
function NavBar() {
  const user = authService.getCurrentUser();
  
  return (
    <nav className="main-nav">
      <div className="nav-brand">Научные Обзоры</div>
      <ul className="nav-links">
        <li><a href="/dashboard">Профиль</a></li>
        <li><a href="/my-articles">Мои статьи</a></li>
        <li><a href="/publish-article">Опубликовать статью</a></li>
      </ul>
      <div className="user-info">
        <span>Привет, {user?.fullName || 'Пользователь'}!</span>
        <a href="/logout" className="logout-link">Выйти</a>
      </div>
    </nav>
  );
}

// Компонент дашборда
function Dashboard() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="content-container">
        <UserProfile />
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

// Компонент для страницы "Мои статьи"
function ArticlesPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="content-container">
        <MyArticles />
      </div>
    </div>
  );
}

// Компонент для страницы "Опубликовать статью"
function PublishArticlePage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="content-container">
        <PublishArticle />
      </div>
    </div>
  );
}

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
          <Route 
            path="/my-articles" 
            element={
              <ProtectedRoute>
                <ArticlesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/publish-article" 
            element={
              <ProtectedRoute>
                <PublishArticlePage />
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