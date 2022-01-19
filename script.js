
const profileOpenPopupButton = document.querySelector('.profile-info__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const poppupSaveButton = document.querySelector('.popup__save');
const profileName = document.querySelector('.profile-info__title');
const profileOccupation = document.querySelector('.profile-info__subtitle');
const popupNameInput = document.querySelector('.name-input');
const popupOccupationInput = document.querySelector('.occupation-input');
const cardLikeButtons = document.querySelectorAll('.cards__like-icon');

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
poppupSaveButton.addEventListener('click', editProfile);

for(let i = 0; i < cardLikeButtons.length; i++) {
    cardLikeButtons[i].addEventListener('click', (evt) => {
        changeLikeIcon(evt, cardLikeButtons[i]);
    });
}


function openPopup(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
}

function closePopup(evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileOccupation.textContent = popupOccupationInput.value;
    closePopup(evt);
}

function changeLikeIcon(evt, cardLikeButton) {
    evt.preventDefault();
    if (cardLikeButton.classList.contains('cards__like-icon_active')) {
        cardLikeButton.classList.remove('cards__like-icon_active');
    } else {
        cardLikeButton.classList.add('cards__like-icon_active');
    }
}