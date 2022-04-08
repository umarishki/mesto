export class Popup {
    constructor(popupSlector) {
        this._popup = document.querySelector(popupSlector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeByClickOverlay = this._closeByClickOverlay.bind(this);
        this._closeByClickCross = this._closeByClickCross.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByClickOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    _closeByClickCross() {
        this.close();
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._closeByClickOverlay);
        this._popup.querySelector('.popup__close').addEventListener('click', this._closeByClickCross);
    }
}