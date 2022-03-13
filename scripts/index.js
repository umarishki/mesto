import { Card, cardsContainer } from './Card.js';
import { FormValidator } from './FormValidator.js';

// profile elements
const profileName = document.querySelector('.profile-info__title');
const profileOccupation = document.querySelector('.profile-info__subtitle');

// pop-up "edit-profile" elements
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');

const btnOpenEditProfile = document.querySelector('.profile-info__edit-btn');

const inputNameEditProfile = document.querySelector('.popup__input_field_name');
const inputOccupationEditProfile = document.querySelector('.popup__input_field_occupation');

// pop-up "add-card" elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');

const btnOpenAddCard = document.querySelector('.profile__add-btn');

const inputNameAddCard = document.querySelector('.popup__input_field_place-name');
const inputSourceAddCard = document.querySelector('.popup__input_field_link');

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

renderDefaultCardsOnPage(initialCards);

addPopupListeners();

const renderFormValidators = (function () {
    const formValidators = [];

    FormValidator.getFormList(document, selectors.formSelector).forEach((formElement) => {
        const formValidator = new FormValidator(selectors, formElement);
        formValidator.enableValidation();
        formValidators.push(formValidator);
    });

    return formValidators;
}());

function addCardWithPopup(evt) {
    evt.preventDefault();

    const cardElement = new Card({name: inputNameAddCard.value, link: inputSourceAddCard.value}, '#card');
    cardElement.getCard(openPopup, toggleNocardMessage);
    cardElement.showCard();

    toggleNocardMessage();

    formAddCard.reset();
    closePopup(popupAddCard);
}

function renderDefaultCardsOnPage(cardsData) {
    cardsData.forEach((item) => {
        const cardElement = new Card(item, '#card');
        cardElement.getCard(openPopup, toggleNocardMessage);
        cardElement.showCard();
    })
}

function editProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inputNameEditProfile.value;
    profileOccupation.textContent = inputOccupationEditProfile.value;

    closePopup(popupEditProfile);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    popup.addEventListener('click', closeByClickOverlay);
    popup.firstElementChild.addEventListener('click', stopPropagationForListener);
    popup.querySelector('.popup__close').addEventListener('click', closeByClickCross);
}

function openPopupWithForms(popup) {
    renderFormValidators.forEach((formValidator) => {
        formValidator.checkValidationToOpenFormIfNeeded(popup);
    })
    openPopup(popup);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closeByClickOverlay(evt) {
    closePopup(evt.target);
}

function closeByClickCross() {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closeByEscape);
    popup.removeEventListener('click', closeByClickOverlay);
    popup.firstElementChild.removeEventListener('click', stopPropagationForListener);
    popup.querySelector('.popup__close').removeEventListener('click', closeByClickCross);
}

function toggleNocardMessage() {
    let noCardMessageElement = document.querySelector('.cards__nocard-massage');
    if (cardsContainer.children.length === 1) {
        noCardMessageElement = document.createElement('p');
        noCardMessageElement.textContent = 'В профиле нет ни одной карточки. Нажмите + для добавления';
        noCardMessageElement.classList.add('cards__nocard-massage');
        cardsContainer.before(noCardMessageElement);
    } else if(noCardMessageElement !== null) {
        noCardMessageElement.remove();
    }
}

function stopPropagationForListener(evt) {
    evt.stopPropagation();
}

function addPopupListeners() {
    btnOpenEditProfile.addEventListener('click', () => {
        inputNameEditProfile.value = profileName.textContent;
        inputOccupationEditProfile.value = profileOccupation.textContent;
        openPopupWithForms(popupEditProfile);
    });

    btnOpenAddCard.addEventListener('click', () => { openPopupWithForms(popupAddCard) });

    formEditProfile.addEventListener('submit', editProfile);
    formAddCard.addEventListener('submit', addCardWithPopup);
}



