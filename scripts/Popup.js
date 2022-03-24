export class Popup {
    constructor(popupSlector) {
        this._popup = document.querySelector(popupSlector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeByClickOverlay = this._closeByClickOverlay.bind(this);
        this._stopPropagationForListener = this._stopPropagationForListener.bind(this)
        this._closeByClickCross = this._closeByClickCross.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._closeByClickOverlay);
        this._popup.firstElementChild.removeEventListener('click', this._stopPropagationForListener);
        this._popup.querySelector('.popup__close').removeEventListener('click', this._closeByClickCross);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByClickOverlay() {
        this.close();
    }
    
    _closeByClickCross() {
        this.close();
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._closeByClickOverlay);
        this._popup.firstElementChild.addEventListener('click', this._stopPropagationForListener);
        this._popup.querySelector('.popup__close').addEventListener('click', this._closeByClickCross);
    }

    _stopPropagationForListener(evt) {
        evt.stopPropagation();
    }
}