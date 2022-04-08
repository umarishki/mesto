import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    close() {
        super.close();
        this._form.removeEventListener('submit', this._listenerCallback);
    }

    setEventListenerForConfirmPopup(callback) {
        this._listenerCallback = () => {
            callback();
        };
        this._form.addEventListener('submit', this._listenerCallback);
    }
}