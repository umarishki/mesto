import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        // this._form.addEventListener('submit', this._submitCallbackWithBind);
    }

    close() {
        super.close();
        this._form.removeEventListener('submit', this._listenerCallback);
    }

    setEventListenerForConfirmPopup(callback) {
        this._listenerCallback = () => {
            callback();
            this.close();
        };
        this._form.addEventListener('submit', this._listenerCallback);
    }
}

// console.log(1, this);
// api.deleteCard(this._ID, (result) => {
//     this._cardElement.remove();
// },
// () => {
//     if (this.btnSubmit) {
//         setNotLoading(popupAddCard.btnSubmit);
//     }
//     console.log('finally');
// });