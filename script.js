
const profileOpenPopupButton = document.querySelector('.profile-info__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const poppupSaveButton = document.querySelector('.popup__save');
const profileName = document.querySelector('.profile-info__title');
const profileOccupation = document.querySelector('.profile-info__subtitle');
const popupNameInput = document.querySelector('.name-input');
const popupOccupationInput = document.querySelector('.occupation-input');

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
poppupSaveButton.addEventListener('click', editProfile);

function openPopup(evt) {
    evt.preventDefault()
    popup.classList.add('popup_opened');
}

function closePopup(evt) {
    evt.preventDefault()
    popup.classList.remove('popup_opened');
}

function editProfile(evt) {
    evt.preventDefault()
    profileName.textContent = popupNameInput.value;
    profileOccupation.textContent = popupOccupationInput.value;
    closePopup(evt);
}
