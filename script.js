
const profileOpenPopupButton = document.querySelector('.profile-info__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const poppupSaveButton = document.querySelector('.popup__save');

profileOpenPopupButton.addEventListener('click', openPopup);




function openPopup() {
    popup.classList.add('popup_opened');
}

function closeEditPopup() {

}

function submitEditPopup() {

}