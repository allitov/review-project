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
import MyReviews from './components/MyReviews';
import NotReviewedArticles from './components/NotReviewedArticles';

function Logout() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);
  
  return <div>Выход из системы...</div>;
}

function NavBar() {
  const user = authService.getCurrentUser();
  const isReviewer = user && user.role === 'ROLE_REVIEWER';
  
  return (
    <nav className="main-nav">
      <div className="nav-brand">Научные Обзоры</div>
      <ul className="nav-links">
        <li><a href="/dashboard">Профиль</a></li>
        
        {isReviewer ? (
          <>
            <li><a href="/my-reviews">Мои рецензии</a></li>
            <li><a href="/not-reviewed-articles">Все статьи</a></li>
          </>
        ) : (
          <>
            <li><a href="/my-articles">Мои статьи</a></li>
            <li><a href="/publish-article">Опубликовать статью</a></li>
          </>
        )}
      </ul>
      <div className="user-info">
        <span>Привет, {user?.fullName || 'Пользователь'}!</span>
        <a href="/logout" className="logout-link">Выйти</a>
      </div>
    </nav>
  );
}

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

const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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

function MyReviewsPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="content-container">
        <MyReviews />
      </div>
    </div>
  );
}

function NotReviewedArticlesPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="content-container">
        <NotReviewedArticles />
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

          <Route 
            path="/my-reviews" 
            element={
              <ProtectedRoute>
                <MyReviewsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/not-reviewed-articles" 
            element={
              <ProtectedRoute>
                <NotReviewedArticlesPage />
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