// profile elements
const profileName = document.querySelector('.profile-info__title');
const profileOccupation = document.querySelector('.profile-info__subtitle');

// pop-up "edit-profile" elements
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');

const btnOpenEditProfile = document.querySelector('.profile-info__edit-btn');
const btnCloseEditProfile = document.querySelector('.popup__close_type_edit-profile');

const inputNameEditProfile = document.querySelector('.popup__input_field_name');
const inputOccupationEditProfile = document.querySelector('.popup__input_field_occupation');

// pop-up "add-card" elements
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');

const btnOpenAddCard = document.querySelector('.profile__add-btn');
const btnCloseAddCard = document.querySelector('.popup__close_type_add-card');

const inputNameAddCard = document.querySelector('.popup__input_field_place-name');
const inputSourceAddCard = document.querySelector('.popup__input_field_link');

// pop-up "card-preview" elements
const popupCardPreview = document.querySelector('.popup_type_card-preview');

const imageCardPreview = document.querySelector('.popup__img-preview');
const titleCardPreview = document.querySelector('.popup__preview-title');

const btnCloseCardPreview = document.querySelector('.popup__close_type_card-preview');

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

defaultCardsState(initialCards);

const btnLikeCard = document.querySelectorAll('.cards__like-icon');

// default cards amount on page
function defaultCardsState(cards) {
    cards.forEach((item) => {
        const altName = 'Фотография: ' + cardsContainer.children.length;
        const cardElement = createCard(item.link, altName, item.name);
        showCard(cardElement);
        addDeleteListener(cardElement.querySelector('.cards__delete-icon'));
        addLikeListener(cardElement.querySelector('.cards__like-icon'));
        addOpenPreviewListener(cardElement.querySelector('.cards__image'), cardElement.querySelector('.cards__title'));
    })
}

function createCard(sourceCard, altText, nameCard) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__image').src = sourceCard;
    cardElement.querySelector('.cards__image').alt = altText;
    cardElement.querySelector('.cards__title').textContent = nameCard;
    return cardElement;
}

function showCard(cardElement) {
    cardsContainer.prepend(cardElement);
}

// add card with pop-up
function addCard(evt) {
    evt.preventDefault();
    let altName = 'Фотография: ' + cardsContainer.children.length;
    const cardElement = createCard(inputSourceAddCard.value, altName, inputNameAddCard.value);
    showCard(cardElement);
    addDeleteListener(cardElement.querySelector('.cards__delete-icon'));
    addLikeListener(cardElement.querySelector('.cards__like-icon'));
    addOpenPreviewListener(cardElement.querySelector('.cards__image'), cardElement.querySelector('.cards__title'));
    closePopupAddCard();
}

function deleteCard(elementCard) {
    elementCard.remove();
}

function changeLikeCardIcon(btnLikeCard) {
    btnLikeCard.classList.toggle('cards__like-icon_active');
}

function openPopupAddCard() {
    popupAddCard.classList.add('popup_opened');
    inputNameAddCard.value = '';
    inputSourceAddCard.value = '';
}

function closePopupAddCard() {
    popupAddCard.classList.remove('popup_opened');
}

function openCardPreview(cardImage, cardTitle) {
    imageCardPreview.src = cardImage.src;
    imageCardPreview.alt = cardTitle.textContent;;
    titleCardPreview.textContent = cardTitle.textContent;
    popupCardPreview.classList.add('popup_opened');
}

function closeCardPreview() {
    popupCardPreview.classList.remove('popup_opened');
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputNameEditProfile.value;
    profileOccupation.textContent = inputOccupationEditProfile.value;
    closePopupEditProfile();
}

function openPopupEditProfile() {
    popupEditProfile.classList.add('popup_opened');
    inputNameEditProfile.value = profileName.textContent;
    inputOccupationEditProfile.value = profileOccupation.textContent;
}

function closePopupEditProfile() {
    popupEditProfile.classList.remove('popup_opened');
}

function addDeleteListener(btnDeleteCard) {
    btnDeleteCard.addEventListener('click', () => {deleteCard(btnDeleteCard.parentElement)});
}

function addLikeListener(btnLikeCard) {
    btnLikeCard.addEventListener('click', () => {changeLikeCardIcon(btnLikeCard)});
}

function addOpenPreviewListener(cardImage, cardTitle) {
    cardImage.addEventListener('click', () => {openCardPreview(cardImage, cardTitle)});
}

// pop-up "edit-profile" event-listeners
btnOpenEditProfile.addEventListener('click', openPopupEditProfile);
btnCloseEditProfile.addEventListener('click', closePopupEditProfile);
formEditProfile.addEventListener('submit', editProfile);

// pop-up "add-card" event-listeners
btnOpenAddCard.addEventListener('click', openPopupAddCard);
btnCloseAddCard.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', addCard);

// pop-up "card-preview" event-listeners
btnCloseCardPreview.addEventListener('click', closeCardPreview);