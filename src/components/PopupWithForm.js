import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunc) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];
        this.btnSubmit = this._popup.querySelector('.popup__button');
        this.formName = this._form.getAttribute('name');

        this._submitFormFunc = submitFormFunc;
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const initialText = this.btnSubmit.textContent;
            this.btnSubmit.textContent = 'Сохранение...';
            this._submitFormFunc(this._getInputValues())
                .then(() => this.close())
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.btnSubmit.textContent = initialText;
                })
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}