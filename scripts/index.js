import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// profile elements
const profileName = document.querySelector('.profile-info__title');
const profileOccupation = document.querySelector('.profile-info__subtitle');

// pop-up "edit-profile" elements
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');

const buttonOpenEditProfile = document.querySelector('.profile-info__edit-btn');

const inputNameEditProfile = document.querySelector('.popup__input_field_name');
const inputOccupationEditProfile = document.querySelector('.popup__input_field_occupation');

// pop-up "add-card" elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');

const buttonOpenAddCard = document.querySelector('.profile__add-btn');

const inputNameAddCard = document.querySelector('.popup__input_field_place-name');
const inputSourceAddCard = document.querySelector('.popup__input_field_link');

// container for cards
const cardsContainer = document.querySelector('.cards-container');

// pop-up "card-preview" elements
const popupCardPreview = document.querySelector('.popup_type_card-preview');

const imageCardPreview = document.querySelector('.popup__img-preview');
const titleCardPreview = document.querySelector('.popup__preview-title');

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

const cardSelectorTemplate = '#card';

renderDefaultCardsOnPage(initialCards);
addPopupListeners();

const profileValidation = new FormValidator(selectors, formEditProfile);
const newCardValidation = new FormValidator(selectors, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 

function generateCard(cardDataObj, selectorCard) {
    const cardElement = new Card(cardDataObj, selectorCard, openImagePopup);
    return cardElement.getCard();
}

function showCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

function addCardWithPopup(evt) {
    evt.preventDefault();

    const cardElement = generateCard({name: inputNameAddCard.value, link: inputSourceAddCard.value}, cardSelectorTemplate);
    showCard(cardElement);

    formAddCard.reset();
    closePopup(popupAddCard);
}

function renderDefaultCardsOnPage(cardsData) {
    cardsData.forEach((item) => {
        const cardElement = generateCard(item, cardSelectorTemplate)
        showCard(cardElement);
    })
}

function openImagePopup(name, link) {
    imageCardPreview.src = link;
    imageCardPreview.alt = name; 
    titleCardPreview.textContent = name;
    openPopup(popupCardPreview);
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

function openAddCardPopup() {
    if (!inputNameAddCard.value && !inputSourceAddCard.value) {
      newCardValidation.resetValidation();
    }
    newCardValidation.changeButtonState();
    openPopup(popupAddCard);
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
    buttonOpenEditProfile.addEventListener('click', () => {
        inputNameEditProfile.value = profileName.textContent;
        inputOccupationEditProfile.value = profileOccupation.textContent;

        profileValidation.resetValidation();
        profileValidation.changeButtonState();
        openPopup(popupEditProfile); 
    });

    buttonOpenAddCard.addEventListener('click', openAddCardPopup);

    formEditProfile.addEventListener('submit', editProfile);
    formAddCard.addEventListener('submit', addCardWithPopup);
}