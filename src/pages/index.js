import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
    formEditProfile, 
    buttonOpenEditProfile, 
    inputNameEditProfile, 
    inputOccupationEditProfile, 
    formAddCard, 
    buttonOpenAddCard, 
    cardSelectorTemplate, 
    initialCards, 
    selectors
} from '../utils/constants.js';

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards-container');
section.renderInitialElements();

const popupWithImage = new PopupWithImage('.popup_type_card-preview');
popupWithImage.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', editProfile);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_add-card', addCardWithPopup);
popupAddCard.setEventListeners();

const formValidators = {}
// Включение валидации
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(selectors);

const userInfo = new UserInfo({ profileNameSelector: '.profile-info__title', profileOccupationSelector: '.profile-info__subtitle' });

buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddCard.addEventListener('click', openAddCardPopup);


function renderCard(cardDataObj) {
    const card = new Card(cardDataObj, cardSelectorTemplate, openImagePopup);
    return card.getCard();
}

function addCardWithPopup(evt, data) {
    evt.preventDefault();

    section.addItem({
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
    const formName =  formAddCard.getAttribute('name');
    const newCardValidation = formValidators[formName];
    newCardValidation.resetValidation();
    newCardValidation.changeButtonState();

    popupAddCard.open();
}

function openEditProfilePopup() {
    const { name, occupation } = userInfo.getUserInfo();
    inputNameEditProfile.value = name;
    inputOccupationEditProfile.value = occupation;

    const formName =  formEditProfile.getAttribute('name');
    const profileValidation = formValidators[formName];
    profileValidation.resetValidation();
    profileValidation.changeButtonState();

    popupEditProfile.open();
}