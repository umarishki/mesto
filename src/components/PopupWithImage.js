import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open(name, link) {
        this._titleCardPreview.textContent = name;
        this._imageCardPreview.alt = name;
        this._imageCardPreview.src = link;
        super.open();
    }
}