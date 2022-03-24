import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunc) {
        super(popupSelector);
        this._submitFormFunc = submitFormFunc;

        this._form = this._popup.querySelector('.popup__form');
        this._submitCallbackWithBind = this._submitCallback.bind(this);

        this._inputs = [...this._form.querySelectorAll('.popup__input')];
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