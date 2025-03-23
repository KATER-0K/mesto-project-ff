//темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//функция создания карточки
export const createCard = (cardData, deleteCallback, likeCallback, openImagePopup) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });
    
    cardImage.addEventListener('click', () => {
        openImagePopup(cardData);
    });

    likeButton.addEventListener('click', () => {
        likeCallback(likeButton);
    });

    return cardElement;
};  

//кнопка лайка
export const likeCard = (likeButton) => {
    likeButton.classList.toggle('card__like-button_is-active');
};

//функция удаления карточки
export const deleteCard = (cardElement) => {
    cardElement.remove();
};