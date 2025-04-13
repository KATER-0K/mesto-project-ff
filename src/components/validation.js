// функция для показа ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
    inputElement.classList.add(config.inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.opacity = '1';
    }
};

// функция для скрытия ошибки
function hideInputError(formElement, inputElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }
};

// функция для проверки валидности поля
function checkInputValidity(formElement, inputElement, config) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

// функция для деактивации кнопки отправки
const disableSubmitButton = (buttonElement, config) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
};

// вешаем слушатели на каждый элемент ввода
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    // проверяем состояние кнопки при открытии формы
    toggleButtonState(inputList, buttonElement, config);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config); // валидируем поле
            toggleButtonState(inputList, buttonElement, config); // обновляем состояние кнопки
        });

        inputElement.addEventListener('focus', () => checkInputValidity(formElement, inputElement, config));
        inputElement.addEventListener('blur', () => checkInputValidity(formElement, inputElement, config));
    });
};

// включаем валидацию для всех форм
export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); // предотвращаем стандартное событие отправки формы
        });
        setEventListeners(formElement, config);
    });
};

// функция для проверки, есть ли невалидные поля
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

// функция для изменения состояния кнопки
function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, config);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

// функция для очистки ошибок валидации и управления состоянием кнопки
export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    // очищаем ошибки для каждого поля ввода
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    });
    
    // управляем состоянием кнопки
    toggleButtonState(inputList, buttonElement, config)

};