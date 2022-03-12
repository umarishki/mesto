export class Card {
    constructor(cardData, cardTemplateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    getCard() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector('.cards__image').src = this._link;
        this._cardElement.querySelector('.cards__image').alt = this._name;
        this._cardElement.querySelector('.cards__title').textContent = this._name;

        this._addEventListeners();

        return this._cardElement;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.cards__item').cloneNode(true);

        return cardElement;
    }

    deleteCard() {
        this._cardElement.remove();
        
        toggleNocardMessage();
    }
    
    changeLikeCardIcon(btnLikeCard) {
        btnLikeCard.classList.toggle('cards__like-icon_active');
    }

    showCard() {
        cardsContainer.prepend(this._cardElement);
    }

    _addEventListeners() {
        this._addDeleteListener(this._cardElement.querySelector('.cards__delete-icon'));
        this._addLikeListener(this._cardElement.querySelector('.cards__like-icon'));
        this._addOpenPreviewListener(this._cardElement.querySelector('.cards__image'), this._cardElement.querySelector('.cards__title'));
    }

    _addDeleteListener(btnDeleteCard) {
        btnDeleteCard.addEventListener('click', () => { this.deleteCard(btnDeleteCard.parentElement) });
    }
    
    _addLikeListener(btnLikeCard) {
        btnLikeCard.addEventListener('click', () => { this.changeLikeCardIcon(btnLikeCard) });
    }
    
    _addOpenPreviewListener(cardImageElement, cardTitleElement) {
        const imageCardPreview = document.querySelector('.popup__img-preview');
        const titleCardPreview = document.querySelector('.popup__preview-title');
        cardImageElement.addEventListener('click', () => {
            imageCardPreview.src = cardImageElement.src;
            imageCardPreview.alt = cardTitleElement.textContent;;
            titleCardPreview.textContent = cardTitleElement.textContent;
            openPopup(popupCardPreview);
        });
    }
}