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
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._buttonLikeCard = this._cardElement.querySelector('.cards__like-icon');
        this._deleteIcon = this._cardElement.querySelector('.cards__delete-icon')

        this._cardTitle = this._cardElement.querySelector('.cards__title');
        this._cardTitle.textContent = this._name;

        this._addEventListeners();

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

    _addEventListeners() {
        this._deleteIcon.addEventListener('click', () => this._deleteCard());   
        this._buttonLikeCard.addEventListener('click', () => this._changeLikeCardIcon());
        this._cardImage.addEventListener('click', () => this._openPopupFunc(this._name, this._link));
    }
}