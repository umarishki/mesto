export class FormValidator {
    constructor(selectorsObj, formElement) {
        this._selectorsObj = selectorsObj;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorsObj.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectorsObj.submitButtonSelector);
        
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
        this._inputList.forEach((inputElement) => {
            this.changeButtonState();

            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.changeButtonState();
            });
        })
    }

    _showInputError(inputElement, errorMessage) {
        const errorMessageElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectorsObj.inputErrorClass);
        errorMessageElement.classList.add(this._selectorsObj.errorClass);
        errorMessageElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectorsObj.inputErrorClass);
        errorMessageElement.classList.remove(this._selectorsObj.errorClass);
        errorMessageElement.textContent = '';
    }

    _isValid(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    changeButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._selectorsObj.inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._selectorsObj.inactiveButtonClass);
        }
    }
}