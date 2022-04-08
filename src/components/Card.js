export class Card {
    constructor(cardData, cardTemplateSelector, openPopupFunc, userInfo, popupConfirmDeletion, apiChangeLike, apiDeleteCard) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likesOwners = cardData.likesOwners;
        this.ID = cardData.ID;
        this._ownerID = cardData.ownerID;

        this._cardTemplateSelector = cardTemplateSelector;
        this._openPopupFunc = openPopupFunc;

        this._userInfo = userInfo;
        this._popupConfirmDeletion = popupConfirmDeletion;

        this._apiChangeLike = apiChangeLike;
        this._apiDeleteCard = apiDeleteCard;
    }

    getCard() {
        this._cardElement = this._getTemplate();

        this._cardImage = this._cardElement.querySelector('.cards__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._likesNumberElement = this._cardElement.querySelector('.cards__likes-number');
        this.setLikesNumber(this._likesOwners.length);

        this._buttonLikeCard = this._cardElement.querySelector('.cards__like-icon');
        this._changeLikeIconIfHaveUserLike();

        this._deleteIcon = this._cardElement.querySelector('.cards__delete-icon')

        if (this._userInfo.getId() !== this._ownerID) {
            this._deleteIcon.remove();
        }

        this._cardTitle = this._cardElement.querySelector('.cards__title');
        this._cardTitle.textContent = this._name;

        this._addEventListeners();

        return this._cardElement;
    }

    _changeLikeIconIfHaveUserLike() {
        this._likesOwners.forEach((userID) => {
            if (userID._id === this._userInfo.getId()) {
                this._buttonLikeCard.classList.add('cards__like-icon_active');
                return;
            }
        });
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.cards__item').cloneNode(true);
        return cardElement;
    }

    _changeLikeCardIcon() {
        if (this._buttonLikeCard.classList.contains('cards__like-icon_active')) {
            this._apiChangeLike(this, true,
                () => {this._buttonLikeCard.classList.remove('cards__like-icon_active')}
            );
        }
        else {
            this._apiChangeLike(this, false,
                () => {this._buttonLikeCard.classList.add('cards__like-icon_active')}
            );
        }
    }

    setLikesNumber(likesNumber) {
        this._likesNumberElement.textContent = likesNumber;
    }

    _addEventListeners() {
        this._deleteIcon.addEventListener('click', () => {
            this._popupConfirmDeletion.setEventListenerForConfirmPopup(() => this._apiDeleteCard(this.ID, this._popupConfirmDeletion, this._cardElement));
            this._popupConfirmDeletion.open();
        });
        this._buttonLikeCard.addEventListener('click', () => {this._changeLikeCardIcon()});
        this._cardImage.addEventListener('click', () => this._openPopupFunc(this._name, this._link));
    }
}