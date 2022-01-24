
const profileOpenPopupButton = document.querySelector('.profile-info__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile-info__title');
const profileOccupation = document.querySelector('.profile-info__subtitle');
const popupNameInput = document.querySelector('.popup__input_field_name');
const popupOccupationInput = document.querySelector('.popup__input_field_occupation');

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editProfile); 

function openPopup() {
    popup.classList.add('popup_opened');
    popupNameInput.value = profileName.textContent;
    popupOccupationInput.value = profileOccupation.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileOccupation.textContent = popupOccupationInput.value;
    closePopup();
}
