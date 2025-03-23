//функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
};
  
//функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
};

//функция закрытия попапа нажатием на Esc
export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
        closePopup(openedPopup);
    };
  };
};