import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
    formEditProfile,
    buttonOpenEditProfile,
    inputNameEditProfile,
    inputOccupationEditProfile,
    formAddCard,
    buttonOpenAddCard,
    cardSelectorTemplate,
    selectors,
    formEditAvatar,
    buttonOpenEditAvatar
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage('.popup_type_card-preview');
popupWithImage.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', editProfile);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_add-card', addCardWithPopup);
popupAddCard.setEventListeners();
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', editAvatar);
popupEditAvatar.setEventListeners();
const popupConfirmDeletion = new PopupWithConfirmation('.popup_type_confirm-deletion');
popupConfirmDeletion.setEventListeners();

buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddCard.addEventListener('click', openAddCardPopup);
buttonOpenEditAvatar.addEventListener('click', openEditAvatarPopup);

const userInfo = new UserInfo({ profileNameSelector: '.profile-info__title', profileOccupationSelector: '.profile-info__subtitle', profileImageSelector: '.profile__image' });
const section = new Section(renderCard, '.cards-container');

const formValidators = {}
// Включение валидации
const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(selectors, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(selectors);

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: 'a7defb5f-ab84-4cfb-b754-de71ce92f20a',
        'Content-Type': 'application/json'
    }
});


Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({name: userData.name, about: userData.about, avatar: userData.avatar, _id: userData._id});
        const initialCards = [];
        cards.forEach((cardInfo) => {
            initialCards.push({
                name: cardInfo.name,
                link: cardInfo.link,
                likesOwners: cardInfo.likes,
                ID: cardInfo._id,
                ownerID: cardInfo.owner._id
            });
        })
        section.renderInitialElements(initialCards);

    })
    .catch((err) => {
        console.log(err);
    });


function apiChangeLike(card, isNeedToDelete, callback) {
    if (isNeedToDelete) {
        api.deleteLike(card.ID)
            .then((result) => {
                callback();
                card.setLikesNumber(result.likes.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        api.putLike(card.ID)
            .then((result) => {
                callback();
                card.setLikesNumber(result.likes.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

function apiDeleteCard(id, popup, cardElement) {
    api.deleteCard(id)
        .then((result) => {
            cardElement.remove();
            popup.close();
        })
        .catch((err) => {
            console.log(err);
        })
}

function renderCard(cardDataObj) {
    const card = new Card(cardDataObj, cardSelectorTemplate, openImagePopup, userInfo, popupConfirmDeletion, apiChangeLike, apiDeleteCard);
    return card.getCard();
}

function addCardWithPopup(data) {
    return api.postNewCard(data)
        .then((result) => {
            section.addItem({
                name: result.name,
                link: result.link,
                likesOwners: result.likes,
                ID: result._id,
                ownerID: result.owner._id,
            });
        })
}

function editProfile(data) {
    return api.patchProfileInfo(data)
        .then((result) => {
            userInfo.setUserInfo({name: result.name, about: result.about, avatar: result.avatar, _id: result._id});
        })
}

function editAvatar(data) {
    return api.patchProfileAvatar(data)
        .then((result) => {
            userInfo.setUserInfo({name: result.name, about: result.about, avatar: result.avatar, _id: result._id});
        })
}

function openImagePopup(name, link) {
    popupWithImage.open(name, link);
}

function openAddCardPopup() {
    const newCardValidation = formValidators[popupAddCard.formName];
    newCardValidation.resetValidation();
    newCardValidation.changeButtonState();

    popupAddCard.open();
}

function openEditProfilePopup() {
    const { name, occupation } = userInfo.getUserInfo();
    inputNameEditProfile.value = name;
    inputOccupationEditProfile.value = occupation;

    const profileValidation = formValidators[popupEditProfile.formName];
    profileValidation.resetValidation();
    profileValidation.changeButtonState();

    popupEditProfile.open();
}

function openEditAvatarPopup() {
    const newCardValidation = formValidators[popupEditAvatar.formName];
    newCardValidation.resetValidation();
    newCardValidation.changeButtonState();

    popupEditAvatar.open();
}
