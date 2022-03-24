import { Popup } from './Popup.js'; 

export class PopupWithImage extends Popup {
    open(name, link) {
        this._imageCardPreview = this._popup.querySelector('.popup__img-preview');
        this._titleCardPreview = this._popup.querySelector('.popup__preview-title');

        this._titleCardPreview.textContent = name;
        this._imageCardPreview.alt = name; 
        this._imageCardPreview.src = link;
        super.open();
    }
}