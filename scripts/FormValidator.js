export class FormValidator {
    constructor(selectorsObj, formElement) {
        this._selectorsObj = selectorsObj;
        this._formElement = formElement;
    }

    // add listeners for form
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    // add listeners for all input-elements in form
    _setEventListeners() {
        const inputList = this.getInputList(this._formElement, this._selectorsObj.inputSelector);
        const buttonElement = this._formElement.querySelector(this._selectorsObj.submitButtonSelector);

        inputList.forEach((inputElement) => {
            this._changeButtonState(inputList, buttonElement);

            inputElement.addEventListener('input', () => {
                this._isValid(false, this._formElement, inputElement);
                this._changeButtonState(inputList, buttonElement);
            });
        })
    }

    _showInputError(inputElement, errorElement, errorMessage) {
        inputElement.classList.add(this._selectorsObj.inputErrorClass);
        errorElement.classList.add(this._selectorsObj.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._selectorsObj.inputErrorClass);
        errorElement.classList.remove(this._selectorsObj.errorClass);
        errorElement.textContent = '';
    }

    _isEmptyForm(inputList) {
        return !(inputList.some((inputElement) => inputElement.value !== ''));
    }

    _isValid(isValidIfEmptyForm, formElement, inputElement) {
        const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);
        if (isValidIfEmptyForm || inputElement.validity.valid) {
            this._hideInputError(inputElement, errorMessageElement);
        } else {
            this._showInputError(inputElement, errorMessageElement, inputElement.validationMessage);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _changeButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._selectorsObj.inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._selectorsObj.inactiveButtonClass);
        }
    }

    checkValidationToOpenFormIfNeeded(popup) {
        if (!FormValidator.getFormList(popup, this._selectorsObj.formSelector).includes(this._formElement)) {
            return;
        }
        const inputList = this.getInputList(this._formElement, this._selectorsObj.inputSelector);
        inputList.forEach((inputElement) => {
            const buttonElement = this._formElement.querySelector(this._selectorsObj.submitButtonSelector);
            this._isValid(this._isEmptyForm(inputList), this._formElement, inputElement);
            this._changeButtonState(inputList, buttonElement);
        });
    }

    getInputList(inputContainer, inputSelector) {
        return Array.from(inputContainer.querySelectorAll(inputSelector));
    }
    
    static getFormList(formContainer, formSelector) {
        return Array.from(formContainer.querySelectorAll(formSelector));
    }
}

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};