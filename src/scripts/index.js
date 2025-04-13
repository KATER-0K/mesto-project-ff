import './../styles/index.css';
import initialCards from './cards.js';
import { createCard } from './../components/card.js';
import { openPopup, closePopup } from './../components/modal.js';
import { clearValidation, enableValidation} from './../components/validation.js';
import { updateAvatar, isImageUrl, fetchCards, fetchUserData, addCard, updateProfileData, toggleLike, deleteCard} from './../components/api.js';

// переменные профиля
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageContainer = document.querySelector('.profile__image-container');

// переменные попапа редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_description');
const formElement = document.forms['edit-profile'];

// переменные попапа добавления карточки
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

// переменные попапа с картинкой
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// переменные попапа изменения аватара
const popupChangeAvatar = document.querySelector('.popup_type_edit-avatar');
const avatarForm = document.forms['new-avatar'];

// переменные попапа подтверждения удаления
const popupDeleteConfirm = document.querySelector('.delete-card-confirm');
const deleteConfirmButton = popupDeleteConfirm.querySelector('.popup__button');

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

let userId = null;
let currentCardId = null;
let currentCardElement = null;

// функция открытия попапа с картинкой
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
};

// функция обновления информации о пользователе на странице
function updateUserProfile(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
};

// функция изменения текста кнопки
function changeButtonText(button, newText, callback) {
  const initialText = button.textContent;
  button.textContent = newText;
  return () => {
    button.textContent = initialText;
    if (callback) callback();
  };
};

// обработчик отправки формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = formElement.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...');

  const newName = nameInput.value;
  const newDescription = jobInput.value;

  updateProfileData(newName, newDescription)
  .then(data => {
    updateUserProfile(data);
    closePopup(editProfilePopup);
  })
  .catch(error => console.error('Ошибка при обновлении профиля:', error))
  .finally(() => resetButton());
};

// обработчик отправки формы добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = newCardForm.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...');

  const name = placeNameInput.value;
  const link = linkInput.value;

  addCard(name, link)
  .then(card => {
    const newCard = createCard(card, openDeleteConfirmationPopup, handleToggleLike, openImagePopup, userId);
    placesList.prepend(newCard);
    closePopup(addCardPopup);
    newCardForm.reset();

    clearValidation(newCardForm, validationSettings);
  })
  .catch(error => console.error('Ошибка при добавлении карточки:', error))
  .finally(() => resetButton());
};

// обработчик отправки формы изменения аватара
function changeAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...');
  const avatarLink = avatarForm.elements['avatar_link'].value;

  isImageUrl(avatarLink)
  .then(isImage => {
    if (!isImage) throw new Error('Ссылка не ведет на изображение');
    return updateAvatar(avatarLink);
  })
  .then(data => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    closePopup(popupChangeAvatar);
    avatarForm.reset();
  })
  .catch(error => console.error('Ошибка при обновлении аватара:', error))
  .finally(() => resetButton());
};

// обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
deleteCard(cardId)
  .then(() => {
    cardElement.remove();
    closePopup(popupDeleteConfirm);
  })
  .catch(error => console.error('Ошибка при удалении карточки:', error));
};

// обработчик лайка
function handleToggleLike(cardId, likeButton, likesNumberElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  toggleLike(cardId, isLiked)
  .then(updatedCard => {
    likesNumberElement.textContent = updatedCard.likes.length;
    likeButton.classList.toggle('card__like-button_is-active');
  })
  .catch(error => {
    console.error('Ошибка при обновлении лайка:', error);
  });
};

// функция открытия формы подтверждения удаления карточки
function openDeleteConfirmationPopup(cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;
  openPopup(popupDeleteConfirm);
};

// слушатель подтверждения удаления карточки
deleteConfirmButton.addEventListener('click', () => {
  if (currentCardId && currentCardElement) {
    handleDeleteCard(currentCardId, currentCardElement);
    currentCardId = null;
    currentCardElement = null;
  }
});

// обработчики открытия попапов
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElement, validationSettings);
  openPopup(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationSettings);
  openPopup(addCardPopup);
});

profileImageContainer.addEventListener('click', () => {
  clearValidation(avatarForm, validationSettings);
  openPopup(popupChangeAvatar);
});

// обработчики закрытия попапов
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

// слушатели Submit
formElement.addEventListener('submit', handleEditProfileSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);
avatarForm.addEventListener('submit', changeAvatarFormSubmit);

// инициализация: Загрузка данных пользователя и карточек
Promise.all([fetchUserData(), fetchCards()])
.then(([userData, cardsData]) => {
  userId = userData._id;
  updateUserProfile(userData);

  // отображаем карточки с сервера
  cardsData.forEach(cardData => {
    const cardElement = createCard(cardData, openDeleteConfirmationPopup, handleToggleLike, openImagePopup, userId);
    placesList.append(cardElement);
  });
})
.catch(error => console.error('Ошибка при загрузке данных:', error));

// включить валидацию форм
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

document.addEventListener('DOMContentLoaded', function() {
  enableValidation(validationSettings);
});