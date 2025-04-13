// функция создания карточки
export function createCard (card, openDeleteConfirmationPopup, handleToggleLike, handleImageClick, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardLikesNumber = cardElement.querySelector('.card__likes-number');
    
    // заполняем данные карточки
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    cardLikesNumber.textContent = card.likes.length;
    
    // проверяем, принадлежит ли карточка текущему пользователю
    if (card.owner._id !== userId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => openDeleteConfirmationPopup(card._id, cardElement));
    }

    // проверяем, лайкнул ли текущий пользователь карточку
    if (card.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // обработчики событий
    likeButton.addEventListener('click', () => handleToggleLike(card._id, likeButton, cardLikesNumber));
    cardImage.addEventListener('click', () => handleImageClick(card));

    return cardElement;
};

// добавлена функция для определения, лайкнута ли карточка
export function isCardLiked(likeButton) {
  return likeButton.classList.contains('card__like-button_is-active');
};

// добавлена функция для обновления состояния лайка
export function updateLikeStatus(likeButton, likesNumberElement, likes) {
  const isLiked = likes.some(like => like._id);
  likeButton.classList.toggle('card__like-button_is-active', isLiked);
  likesNumberElement.textContent = likes.length;
};

// добавлена функция для удаления карточки из DOM
export function removeCardFromDOM(cardElement) {
  cardElement.remove();
};