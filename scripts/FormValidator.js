export class FormValidator {
    constructor(selectorsObj, formElement) {
        this._selectorsObj = selectorsObj;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this._selectorsObj.inputSelector));
        this._buttonElement = this.formElement.querySelector(this._selectorsObj.submitButtonSelector);
        
    }

    // add listeners for form
    enableValidation() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    // add listeners for all input-elements in form
    _setEventListeners() {
        this.inputList.forEach((inputElement) => {
            this.changeButtonState();

            inputElement.addEventListener('input', () => {
                this.isValid(false, this.formElement, inputElement);
                this.changeButtonState();
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

    isEmptyForm() {
        return !(this.inputList.some((inputElement) => inputElement.value !== ''));
    }

    isValid(isValidIfEmptyForm, formElement, inputElement) {
        // Примечание к комментарию ревью: кажется, что при открыти формы пустые поля - это валидно. А вот при работе с формой, пустые поля должны посвечиваться ошибкой
        // isValidIfEmptyForm используется для того, чтобы определить нужно ли валидировать форму или нет
        const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);
        if (isValidIfEmptyForm || inputElement.validity.valid) {
            this._hideInputError(inputElement, errorMessageElement);
        } else {
            this._showInputError(inputElement, errorMessageElement, inputElement.validationMessage);
        }
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
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