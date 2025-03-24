import './../styles/index.css';
import initialCards from './cards.js';
import { createCard, likeCard, deleteCard } from './../components/card.js';
import { openPopup, closePopup, closePopupByEscape } from './../components/modal.js';

const placesList = document.querySelector('.places__list');

//вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placesList.append(cardElement);
});

//элементы попапа с картинкой
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//элементы попапа редактирования
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('form[name="edit-profile"]');

//элементы попапа добавления карточки
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

const popups = document.querySelectorAll('.popup');

//функция открытия попапа с картинкой
function openImagePopup(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup);
};

//обработчик закрытия попапа по клику на оверлей и кнопку закрытия
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  });
});

//обработчики открытия попапов
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

formElement.addEventListener('submit', handleEditProfileSubmit);

//обработчик отправки формы
function handleEditProfileSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newDescription = jobInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newDescription;

    closePopup(editProfilePopup);
};

//добавление карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const name = placeNameInput.value;
    const link = linkInput.value;

    const newCardData = {
        name: name,
        link: link
    };

    const newCard = createCard(newCardData, deleteCard, likeCard, openImagePopup);

    placesList.prepend(newCard);

    closePopup(addCardPopup);

    newCardForm.reset();
};

newCardForm.addEventListener('submit', handleNewCardSubmit);