import '../blocks/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// @todo: DOM узлы
const renderCard = (cardData, container) => {
    const cardElement = createCard(cardData, deleteCard);
    container.append(cardElement);
};

// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener("click", () => {
        deleteCallback(cardElement);
    });
    
    return cardElement;
};  

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
    cardElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    renderCard(cardData, placesList);
});