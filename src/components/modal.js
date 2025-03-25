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
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
        closePopup(openedPopup);
    };
  };
};

//функция добавления анимации к попапам
export function initializePopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
}