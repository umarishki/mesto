export class UserInfo {
    constructor({ profileNameSelector, profileOccupationSelector, profileImageSelector}) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._occupationElement = document.querySelector(profileOccupationSelector);
        this._imageElement = document.querySelector(profileImageSelector);
        this._id = null;
    }

    getUserInfo() {
        const userData = { name: this._nameElement.textContent, occupation: this._occupationElement.textContent };
        return userData
    }

    setUserInfo(name, occupation) {
        this._nameElement.textContent = name;
        this._occupationElement.textContent = occupation;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    setUserImage(avatarLink) {
        this._imageElement.src = avatarLink;
    }
}