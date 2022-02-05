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

// default cards amount on page
function defaultCardsState(cards) {
    cards.forEach((item) => {
        const cardElement = createCard(item.link, item.name);
        showCard(cardElement);
    })
}

// add card with pop-up
function addCard(evt) {
    evt.preventDefault();

    const cardElement = createCard(inputSourceAddCard.value, inputNameAddCard.value);
    const noCardMessageElement = document.querySelector('.cards__nocard-massage')

    showCard(cardElement);

    // check if have a massage
    if (noCardMessageElement !== null) {
        noCardMessageElement.remove();
    }

    inputNameAddCard.value = '';
    inputSourceAddCard.value = '';
    
    closePopup(popupAddCard);
}

function showCard(cardElement) {
    cardsContainer.prepend(cardElement);
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

function editProfile(evt) {
    evt.preventDefault();

    profileName.textContent = inputNameEditProfile.value;
    profileOccupation.textContent = inputOccupationEditProfile.value;

    closePopup(popupEditProfile);
}

function changeLikeCardIcon(btnLikeCard) {
    btnLikeCard.classList.toggle('cards__like-icon_active');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addDeleteListener(btnDeleteCard) {
    btnDeleteCard.addEventListener('click', () => {deleteCard(btnDeleteCard.parentElement)});
}

function addLikeListener(btnLikeCard) {
    btnLikeCard.addEventListener('click', () => {changeLikeCardIcon(btnLikeCard)});
}

function addOpenPreviewListener(cardImage, cardTitle) {
    cardImage.addEventListener('click', () => {
        imageCardPreview.src = cardImage.src;
        imageCardPreview.alt = cardTitle.textContent;;
        titleCardPreview.textContent = cardTitle.textContent;
        openPopup(popupCardPreview);
    });
}

// pop-up "edit-profile" event-listeners
btnOpenEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    inputNameEditProfile.value = profileName.textContent;
    inputOccupationEditProfile.value = profileOccupation.textContent;
});
btnCloseEditProfile.addEventListener('click', () => {closePopup(popupEditProfile)});
formEditProfile.addEventListener('submit', editProfile);

// pop-up "add-card" event-listeners
btnOpenAddCard.addEventListener('click', () => {openPopup(popupAddCard)});
btnCloseAddCard.addEventListener('click', () => {closePopup(popupAddCard)});
formAddCard.addEventListener('submit', addCard);

// pop-up "card-preview" event-listeners
btnCloseCardPreview.addEventListener('click', () => {closePopup(popupCardPreview)});