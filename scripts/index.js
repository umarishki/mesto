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
function defaultCardsState(initialCards) {
    let altName;
    let cardElement;
    initialCards.forEach((item) => {
        altName = 'Фотография: ' + cardsContainer.children.length;
        cardElement = createCard(item.link, altName, item.name);
        showCard(cardElement);
        addDeleteListener(cardElement.querySelector('.cards__delete-icon'));
        addLikeListener(cardElement.querySelector('.cards__like-icon'));
    })
}

// create card
function createCard(sourceCard, altText, nameCard) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__image').src = sourceCard;
    cardElement.querySelector('.cards__image').alt = altText;
    cardElement.querySelector('.cards__title').textContent = nameCard;
    return cardElement;
}

// show card
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
    closePopupAddCard();
}

// delete card
function deleteCard(elementCard) {
    elementCard.remove();
}

function changeLikeCardIcon(btnLikeCard) {
    btnLikeCard.classList.toggle('cards__like-icon_active');
}

// open pop-up "add-card"
function openPopupAddCard() {
    popupAddCard.classList.add('popup_opened');
    inputNameAddCard.value = '';
    inputSourceAddCard.value = '';
}

// close pop-up "add-card"
function closePopupAddCard() {
    popupAddCard.classList.remove('popup_opened');
}

// delete card event-listener
function addDeleteListener(btnDeleteCard) {
    btnDeleteCard.addEventListener('click', () => {deleteCard(btnDeleteCard.parentElement)});
}

// like card event-listener
function addLikeListener(btnLikeCard) {
    btnLikeCard.addEventListener('click', () => {changeLikeCardIcon(btnLikeCard)});
}

// open pop-up "edit-profile"
function openPopupEditProfile() {
    popupEditProfile.classList.add('popup_opened');
    inputNameEditProfile.value = profileName.textContent;
    inputOccupationEditProfile.value = profileOccupation.textContent;
}

// close pop-up "edit-profile"
function closePopupEditProfile() {
    popupEditProfile.classList.remove('popup_opened');
}

// edit profile
function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputNameEditProfile.value;
    profileOccupation.textContent = inputOccupationEditProfile.value;
    closePopupEditProfile();
}

// pop-up "edit-profile" event-listeners
btnOpenEditProfile.addEventListener('click', openPopupEditProfile);
btnCloseEditProfile.addEventListener('click', closePopupEditProfile);
formEditProfile.addEventListener('submit', editProfile);

// pop-up "add-card" event-listeners
btnOpenAddCard.addEventListener('click', openPopupAddCard);
btnCloseAddCard.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', addCard);