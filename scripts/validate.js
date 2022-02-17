
// add listeners for all forms in document
function enableValidation({ formSelector, ...selectorsObj }) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, selectorsObj);
    })
}

// add listeners for all input-elements in form
function setEventListeners(formElement, { inputSelector, ...selectorsObj }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const { submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = selectorsObj;
    const buttonElement = formElement.querySelector(submitButtonSelector);
    let isValidIfEmptyForm = isEmptyForm(inputList);

    inputList.forEach((inputElement) => {
        changeButtonState(inputList, buttonElement, inactiveButtonClass);
        isValid(isValidIfEmptyForm, formElement, inputElement, inputErrorClass, errorClass);
        inputElement.addEventListener('input', () => {
            isValidIfEmptyForm = false;
            isValid(isValidIfEmptyForm, formElement, inputElement, inputErrorClass, errorClass);
            changeButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    })
}

function showInputError(inputElement, errorElement, errorMessage, inputErrorClass, errorClass) {
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function isEmptyForm(inputList) {
    return !(inputList.some((inputElement) => inputElement.value !== ''));
}

function isValid(isValidIfEmptyForm, formElement, inputElement, inputErrorClass, errorClass) {
    const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (isValidIfEmptyForm || inputElement.validity.valid) {
        hideInputError(inputElement, errorMessageElement, inputErrorClass, errorClass);
    } else {
        showInputError(inputElement, errorMessageElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function changeButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass);
    }
}