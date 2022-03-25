import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageCardPreview = this._popup.querySelector('.popup__img-preview');
        this._titleCardPreview = this._popup.querySelector('.popup__preview-title');
    }

    open(name, link) {
        this._titleCardPreview.textContent = name;
        this._imageCardPreview.alt = name;
        this._imageCardPreview.src = link;
        super.open();
    }
}