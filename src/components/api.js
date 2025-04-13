export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'cdba27e6-6880-4a32-9a4e-c42ff680292d',
      'Content-Type': 'application/json'
    }
};
  
// функция для обработки ответа от сервера
const handleResponse = (res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
};
  
// загрузка данных пользователя
export const fetchUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(handleResponse);
};
  
// загрузка карточек
export const fetchCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(handleResponse);
};
  
// функция для обновления аватара
export const updateAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(handleResponse);
};
  
// функция для проверки MIME-типа изображения
export const isImageUrl = (url) => {
    return fetch(url, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          throw new Error('Ошибка при проверке ссылки');
        }
        const contentType = res.headers.get('Content-Type');
        return contentType && contentType.startsWith('image');
      })
      .catch(() => false);
};
  
// функция для добавления новой карточки
export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
    }).then(handleResponse);
};
  
// функция для обновления данных профиля на сервере
export const updateProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(handleResponse);
};
  
// функция для удаления карточки
export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(handleResponse);
};
  
// функция для постановки/снятия лайка
export const toggleLike = (cardId, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: config.headers
    }).then(handleResponse);
};