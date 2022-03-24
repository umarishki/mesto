import './pages/index.css';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';


// pop-up "edit-profile" elements
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const buttonOpenEditProfile = document.querySelector('.profile-info__edit-btn');
const inputNameEditProfile = document.querySelector('.popup__input_field_name');
const inputOccupationEditProfile = document.querySelector('.popup__input_field_occupation');

// pop-up "add-card" elements
const formAddCard = document.querySelector('.popup__form_type_add-card');
const buttonOpenAddCard = document.querySelector('.profile__add-btn');
const inputNameAddCard = document.querySelector('.popup__input_field_place-name');
const inputSourceAddCard = document.querySelector('.popup__input_field_link');

const cardSelectorTemplate = '#card';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards-container');
section.renderInitialElements();

const popupWithImage = new PopupWithImage('.popup_type_card-preview');
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', editProfile);
const popupAddCard = new PopupWithForm('.popup_type_add-card', addCardWithPopup);

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();

const userInfo = new UserInfo({ profileNameSelector: '.profile-info__title', profileOccupationSelector: '.profile-info__subtitle' });

buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddCard.addEventListener('click', openAddCardPopup);


function renderCard(cardDataObj) {
    const cardElement = createCard(cardDataObj);
    section.addItem(cardElement);
}

function createCard(cardDataObj) {
    const card = new Card(cardDataObj, cardSelectorTemplate, openImagePopup);
    return card.getCard();
}

function addCardWithPopup(evt, data) {
    evt.preventDefault();
    renderCard({
        name: data['place-name'],
        link: data.link,
    });

    popupAddCard.close();
}

function editProfile(evt, data) {
    evt.preventDefault();
    const { name, occupation } = data;
    userInfo.setUserInfo(name, occupation);

    popupEditProfile.close();
}

function openImagePopup(name, link) {
    popupWithImage.open(name, link);
}

function openAddCardPopup() {
    if (!inputNameAddCard.value && !inputSourceAddCard.value) {
        newCardValidation.resetValidation();
    }
    newCardValidation.changeButtonState();

    popupAddCard.open();
}

function openEditProfilePopup() {
    const { name, occupation } = userInfo.getUserInfo();
    inputNameEditProfile.value = name;
    inputOccupationEditProfile.value = occupation;

    profileValidation.resetValidation();
    profileValidation.changeButtonState();

    popupEditProfile.open();
}