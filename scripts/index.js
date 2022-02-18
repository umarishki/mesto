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

// pop-up "card-preview" elements
const popupCardPreview = document.querySelector('.popup_type_card-preview');

const imageCardPreview = document.querySelector('.popup__img-preview');
const titleCardPreview = document.querySelector('.popup__preview-title');

// template element
const cardTemplate = document.querySelector('#card').content;

// cards-container element
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

defaultCardsOnPage(initialCards);

addPopupListeners();

function createCard(sourceCard, nameCard) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__image').src = sourceCard;
    cardElement.querySelector('.cards__image').alt = nameCard;
    cardElement.querySelector('.cards__title').textContent = nameCard;

    addDeleteListener(cardElement.querySelector('.cards__delete-icon'));
    addLikeListener(cardElement.querySelector('.cards__like-icon'));
    addOpenPreviewListener(cardElement.querySelector('.cards__image'), cardElement.querySelector('.cards__title'));

    return cardElement;
}

function addCardWithPopup(evt) {
    evt.preventDefault();

    const cardElement = createCard(inputSourceAddCard.value, inputNameAddCard.value);
    const noCardMessageElement = document.querySelector('.cards__nocard-massage')

    showCard(cardElement);

    // check if have a massage
    if (noCardMessageElement !== null) {
        noCardMessageElement.remove();
    }

    formAddCard.reset();
    closePopup(popupAddCard);
}

function showCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

function defaultCardsOnPage(cards) {
    cards.forEach((item) => {
        const cardElement = createCard(item.link, item.name);
        showCard(cardElement);
    })
}

function deleteCard(elementCard) {
    elementCard.remove();
    if (cardsContainer.children.length === 1) {
        const noCardMessageElement = document.createElement('p');
        noCardMessageElement.textContent = 'В профиле нет ни одной карточки. Нажмите + для добавления';
        noCardMessageElement.classList.add('cards__nocard-massage');
        cardsContainer.before(noCardMessageElement);
    }
}

function changeLikeCardIcon(btnLikeCard) {
    btnLikeCard.classList.toggle('cards__like-icon_active');
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
    getFormList(popup).forEach((formElement) => {
        const inputList = getInputList(formElement);
        inputList.forEach((inputElement) => {
            const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
            isValid(isEmptyForm(inputList), formElement, inputElement, selectors.inputErrorClass, selectors.errorClass);
            changeButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
        });
    });

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

function addDeleteListener(btnDeleteCard) {
    btnDeleteCard.addEventListener('click', () => { deleteCard(btnDeleteCard.parentElement) });
}

function addLikeListener(btnLikeCard) {
    btnLikeCard.addEventListener('click', () => { changeLikeCardIcon(btnLikeCard) });
}

function addOpenPreviewListener(cardImage, cardTitle) {
    cardImage.addEventListener('click', () => {
        imageCardPreview.src = cardImage.src;
        imageCardPreview.alt = cardTitle.textContent;;
        titleCardPreview.textContent = cardTitle.textContent;
        openPopup(popupCardPreview);
    });
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

function getInputList(inputContainer) {
    return Array.from(inputContainer.querySelectorAll(selectors.inputSelector));
}

function getFormList(formContainer) {
    return Array.from(formContainer.querySelectorAll(selectors.formSelector));
}