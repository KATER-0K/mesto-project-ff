// функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.add('popup_is-opened'); 
    }, 50);

    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlayClick);
};
  
// функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlayClick);
    
    const formElement = popup.querySelector('.popup__form');
    if (formElement) {
        formElement.reset(); 
    }
};

// функция закрытия попапа нажатием на Esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
        closePopup(openedPopup);
        }
    }
};

// закрытие попапа при клике на оверлей
function closeByOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      const popup = e.target;
      
      closePopup(popup);
    }
};