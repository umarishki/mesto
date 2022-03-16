// pop-up "card-preview" elements
const popupCardPreview = document.querySelector('.popup_type_card-preview');

export class Card {
    constructor(cardData, cardTemplateSelector, openPopupFunc) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._openPopupFunc = openPopupFunc;
    }

    getCard() {
        this._cardElement = this._getTemplate();

        this._cardImage = this._cardElement.querySelector('.cards__image');
        this._buttonLikeCard = this._cardElement.querySelector('.cards__like-icon');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.cards__title').textContent = this._name;

        this._addEventListeners(this._openPopupFunc);

        return this._cardElement;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.cards__item').cloneNode(true);

        return cardElement;
    }

    _deleteCard() {
        this._cardElement.remove();
    }
    
    _changeLikeCardIcon() {
        this._buttonLikeCard.classList.toggle('cards__like-icon_active');
    }

    _addEventListeners(openPopupFunc) {
        this._cardElement.querySelector('.cards__delete-icon').addEventListener('click', () => this._deleteCard());   
        this._buttonLikeCard.addEventListener('click', () => this._changeLikeCardIcon());

        this._addOpenPreviewListener(this._cardImage, this._cardElement.querySelector('.cards__title'), openPopupFunc);
    }
    
    _addOpenPreviewListener(cardImageElement, cardTitleElement, openPopupFunc) {
        const imageCardPreview = document.querySelector('.popup__img-preview');
        const titleCardPreview = document.querySelector('.popup__preview-title');
        cardImageElement.addEventListener('click', () => {
            imageCardPreview.src = cardImageElement.src;
            imageCardPreview.alt = cardTitleElement.textContent;;
            titleCardPreview.textContent = cardTitleElement.textContent;
            openPopupFunc(popupCardPreview);
        });
    }
}