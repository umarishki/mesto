import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunc) {
        super(popupSelector);
        this._submitFormFunc = submitFormFunc;

        this._form = this._popup.querySelector('.popup__form');
        this._submitCallbackWithBind = this._submitCallback.bind(this);
    }

    _getInputValues() {
        const values = {};
        const inputs = [...this._form.querySelectorAll('.popup__input')];
        inputs.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', this._submitCallbackWithBind);
    }

    _submitCallback(evt) {
        this._submitFormFunc(evt, this._getInputValues());
    }

    close() {
        super.close();
        this._form.reset();
    }
}