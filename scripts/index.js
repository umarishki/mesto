import { Card } from './Card.js';
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

// container for cards
const cardsContainer = document.querySelector('.cards-container');

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

    getFormList(document, selectors.formSelector).forEach((formElement) => {
        const formValidator = new FormValidator(selectors, formElement);
        formValidator.enableValidation();
        formValidators.push(formValidator);
    });

    return formValidators;
}());

function generateCard(cardDataObj, selectorCard) {
    const cardElement = new Card(cardDataObj, selectorCard, openPopup);
    return cardElement.getCard();
}

function showCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

function addCardWithPopup(evt) {
    evt.preventDefault();

    const cardElement = generateCard({name: inputNameAddCard.value, link: inputSourceAddCard.value}, '#card');
    showCard(cardElement);

    formAddCard.reset();
    closePopup(popupAddCard);
}

function renderDefaultCardsOnPage(cardsData) {
    cardsData.forEach((item) => {
        const cardElement = generateCard(item, '#card')
        showCard(cardElement);
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
    const formList = getFormList(popup, selectors.formSelector);
    renderFormValidators.forEach((formValidator) => {
        if (formList.includes(formValidator.formElement)) {
            formValidator.inputList.forEach((inputElement) => {
            // вызов по описанному ниже кейсу
            formValidator.isValid(formValidator.isEmptyForm(), formValidator.formElement, inputElement);
            formValidator.changeButtonState();
            })
        }
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

function stopPropagationForListener(evt) {
    evt.stopPropagation();
}

function addPopupListeners() {
    btnOpenEditProfile.addEventListener('click', () => {
        inputNameEditProfile.value = profileName.textContent;
        inputOccupationEditProfile.value = profileOccupation.textContent;

        // в openPopupWithForms также выполняется вызов isValid для того, чтобы убрать ошибки, возникающие в таком кейсе: открыли форму,
        // ввели значения в оба инпута, удалили все значения. Отображаются ошибки о пустых инпутах. Далее форму закрываем и снова открываем.
        // Наставник в прошлой работе согласился, что при новом открытии формы в таком случае ошибки не должны отображаться - это кажется стандартным поведением.
        // Для этого и вызываем isValid, а не просто оперируем changeButtonState.
        openPopupWithForms(popupEditProfile);
    });

    btnOpenAddCard.addEventListener('click', () => { openPopupWithForms(popupAddCard) });

    formEditProfile.addEventListener('submit', editProfile);
    formAddCard.addEventListener('submit', addCardWithPopup);
}

function getFormList(formContainer, formSelector) {
    return Array.from(formContainer.querySelectorAll(formSelector));
}