import React, { useState, useEffect, useRef } from 'react';
import userService from '../services/userService';
import authService from '../services/authService';
import './profile/UserProfile.css';

const UserIcon = () => (
  <svg className="user-icon-svg" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="social-icon-svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="social-icon-svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const dataLoaded = useRef(false);
  
  const user = authService.getCurrentUser();

  const getBaseUserData = () => {
    return {
      id: user?.userId,
      fullName: user?.fullName || 'Имя не указано',
      email: user?.email || 'email@example.com',
      title: 'Пользователь',  // Поле отсутствует в UserResponse, но используется на фронтенде
      specialization: '',
      location: '',
      bio: '',
      institution: '',
      fieldOfExp: '',
      socialLinks: {
        twitter: '',
        linkedin: '',
      },
      avatarUrl: '',
    };
  };

  const mergeServerData = (serverData, baseData) => {
    return {
      ...baseData,
      id: serverData.id,
      fullName: serverData.fullName,
      email: serverData.email,
      specialization: serverData.specialization || '',
      location: serverData.location || '',
      bio: serverData.bio || '',
      institution: serverData.institution || '',
      fieldOfExp: serverData.fieldOfExp || '',
    };
  };

  useEffect(() => {
    if (dataLoaded.current) return;
    
    const loadData = async () => {
      if (!user || !user.userId) {
        setError('Не удалось получить данные пользователя.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      setSuccessMessage('');
      
      const baseUserData = getBaseUserData();
      
      try {
        const serverData = await userService.getUserById(user.userId);

        const mergedData = mergeServerData(serverData, baseUserData);
        
        setUserData(mergedData);
        setFormData(mergedData);

        const incompleteProfile = !serverData.specialization && 
                                 !serverData.location && 
                                 !serverData.bio;
        setIsNewUser(incompleteProfile);

        dataLoaded.current = true;
      } catch (err) {
        console.error('Ошибка при загрузке данных пользователя:', err);
        
        setUserData(baseUserData);
        setFormData(baseUserData);
        setIsNewUser(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setSuccessMessage('');
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!formData || !user || !user.userId) return;
    
    setSaving(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const userRequest = {
        fullName: formData.fullName,
        email: formData.email,
        specialization: formData.specialization || null,
        location: formData.location || null,
        bio: formData.bio || null,
        institution: formData.institution || null,
        fieldOfExp: formData.fieldOfExp || null
      };

      const updatedServerData = await userService.updateUser(user.userId, userRequest);

      const updatedData = mergeServerData(updatedServerData, formData);
      
      setUserData(updatedData);
      setFormData(updatedData);
      setSuccessMessage('Профиль успешно обновлен!');
      setIsNewUser(false);
    } catch (err) {
      console.error('Ошибка при обновлении данных:', err);
      setError(err.message || 'Не удалось сохранить изменения.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setError('');
    setSuccessMessage('');
  };

  if (loading) {
    return <div className="loading-screen">Загрузка данных профиля...</div>;
  }

  return (
    <div className="profile-card">
      {error && !userData && (
        <div className="error-container-fullpage">
          <h2 className="error-title-fullpage">Ошибка</h2>
          <p className="error-message-box">{error}</p>
          <p className="error-description-fullpage">Не удалось загрузить данные пользователя. Пожалуйста, проверьте ID пользователя или попробуйте позже.</p>
        </div>
      )}

      {formData && (
        <>
          {isNewUser && (
            <div className="welcome-message message-box info-message">
              <h2>Добро пожаловать в систему Научных Обзоров!</h2>
              <p>Пожалуйста, заполните информацию о себе, чтобы другие пользователи могли узнать вас лучше.</p>
            </div>
          )}
          
          <div className="profile-header">
            <div className="profile-header-content">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="User Avatar" className="avatar-image" onError={(e) => e.target.style.display='none'} />
              ) : (
                <div className="avatar-placeholder">
                  <UserIcon />
                </div>
              )}
              <div className="user-info">
                <h1 className="user-name">{formData.fullName || 'Имя не указано'}</h1>
                <p className="user-title">{formData.title || 'Пользователь'}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveChanges}>
            <div className="form-section">
              {error && <div className="message-box error-message">{error}</div>}
              {successMessage && <div className="message-box success-message">{successMessage}</div>}

              <div className="form-grid">
                <div>
                  <label htmlFor="fullName" className="form-label">Полное имя *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    id="fullName" 
                    value={formData.fullName || ''} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="Введите ваше полное имя"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email || ''} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="Введите ваш email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="specialization" className="form-label">Специализация</label>
                  <input 
                    type="text" 
                    name="specialization" 
                    id="specialization" 
                    value={formData.specialization || ''} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="Например: Биолог, Физик, Программист"
                  />
                  {isNewUser && !formData.specialization && (
                    <small className="hint-text">Укажите вашу специализацию для лучшего взаимодействия с сообществом</small>
                  )}
                </div>
                <div>
                  <label htmlFor="location" className="form-label">Местоположение</label>
                  <input 
                    type="text" 
                    name="location" 
                    id="location" 
                    value={formData.location || ''} 
                    onChange={handleChange} 
                    className="form-input" 
                    placeholder="Например: Москва, Россия"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="bio" className="form-label">Биография</label>
                <textarea 
                  name="bio" 
                  id="bio" 
                  rows="4" 
                  value={formData.bio || ''} 
                  onChange={handleChange} 
                  className="form-textarea"
                  placeholder="Расскажите о себе, вашем опыте и интересах в научной сфере"
                ></textarea>
                {isNewUser && !formData.bio && (
                  <small className="hint-text">Заполните биографию, чтобы другие пользователи могли узнать вас лучше</small>
                )}
              </div>

              <div className="form-field">
                <h3 className="social-links-title">Социальные сети</h3>
                <div className="social-links-container">
                  <div className="social-link-item">
                    <span className="social-icon-wrapper"><TwitterIcon /></span>
                    <input 
                      type="text" 
                      name="socialLinks.twitter" 
                      placeholder="@username" 
                      value={formData.socialLinks?.twitter || ''} 
                      onChange={handleChange} 
                      className="form-input" 
                    />
                  </div>
                  <div className="social-link-item">
                    <span className="social-icon-wrapper"><LinkedinIcon /></span>
                    <input 
                      type="text" 
                      name="socialLinks.linkedin" 
                      placeholder="linkedin.com/in/username" 
                      value={formData.socialLinks?.linkedin || ''} 
                      onChange={handleChange} 
                      className="form-input" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="button button-secondary"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={saving}
                className="button button-primary"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UserProfile;