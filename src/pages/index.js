import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
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
const popupConfirmDeletion = new PopupWithForm('.popup_type_confirm-deletion', undefined);
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
        // получаем данные из атрибута `name` у формы
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

api.getProfileInfo((result) => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserImage(result.avatar);
    userInfo.setId(result._id);
});

api.getInitialCards((result) => {
    const initialCards = [];
    result.forEach((cardInfo) => {
        initialCards.push({
            name: cardInfo.name,
            link: cardInfo.link,
            likesNumber: cardInfo.likes.length,
            ID: cardInfo._id,
            ownerID: cardInfo.owner._id
        });
    })
    section.renderInitialElements(initialCards);
});

function apiChangeLike(card, toggle) {
    if (toggle === 'delete') {
        api.deleteLike(card._ID, (result) => {
            card.setLikesNumber(result.likes.length);
        });
    }
    else {
        api.putLike(card._ID, (result) => {
            card.setLikesNumber(result.likes.length);
        });
    }
}

function renderCard(cardDataObj) {
    const card = new Card(cardDataObj, cardSelectorTemplate, openImagePopup, userInfo, popupConfirmDeletion, apiChangeLike);
    return card.getCard();
}

function addCardWithPopup(evt, data) {
    evt.preventDefault();
    api.postNewCard(data, popupAddCard.btnSubmit, (result) => {
        section.addItem({
            name: result.name,
            link: result.link,
            likesNumber: result.likes.length,
            ID: result._id,
            ownerID: result.owner._id,
        });
        api.setNotLoading(popupAddCard.btnSubmit);
        popupAddCard.close();
    });
}

function editProfile(evt, data) {
    evt.preventDefault();
    api.patchProfileInfo(data, popupEditProfile.btnSubmit, (result) => {
        userInfo.setUserInfo(result.name, result.about);
        api.setNotLoading(popupEditProfile.btnSubmit);
        popupEditProfile.close();
    });
}

function editAvatar(evt, data) {
    evt.preventDefault();
    api.patchProfileAvatar(data, popupEditAvatar.btnSubmit, (result) => {
        userInfo.setUserImage(result.avatar);
        api.setNotLoading(popupEditAvatar.btnSubmit);
        popupEditAvatar.close();
    });
}

function openImagePopup(name, link) {
    popupWithImage.open(name, link);
}

function openAddCardPopup() {
    const formName = formAddCard.getAttribute('name');
    const newCardValidation = formValidators[formName];
    newCardValidation.resetValidation();
    newCardValidation.changeButtonState();

    popupAddCard.open();
}

function openEditProfilePopup() {
    const { name, occupation } = userInfo.getUserInfo();
    inputNameEditProfile.value = name;
    inputOccupationEditProfile.value = occupation;

    const formName = formEditProfile.getAttribute('name');
    const profileValidation = formValidators[formName];
    profileValidation.resetValidation();
    profileValidation.changeButtonState();

    popupEditProfile.open();
}

function openEditAvatarPopup() {
    const formName = formEditAvatar.getAttribute('name');
    const newCardValidation = formValidators[formName];
    newCardValidation.resetValidation();
    newCardValidation.changeButtonState();

    popupEditAvatar.open();
}
