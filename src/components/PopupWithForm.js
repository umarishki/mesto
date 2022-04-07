import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunc) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];

        this._submitFormFunc = submitFormFunc;
        this._submitCallbackWithBind = this._submitCallback.bind(this);
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

        if(this._submitFormFunc) {
            this._form.addEventListener('submit', this._submitCallbackWithBind);
        }
    }

    setEventListenerForConfirmPopup(callback) {
        this._form.addEventListener('submit', () => {
            callback();
            this.close();
        });
    }

    _submitCallback(evt) {
        if(this._submitFormFunc) {
            this._submitFormFunc(evt, this._getInputValues());
        }
    }

    close() {
        super.close();
        this._form.reset();
    }
}