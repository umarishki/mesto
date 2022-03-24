export class UserInfo {
    constructor({ profileNameSelector, profileOccupationSelector }) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._occupationElement = document.querySelector(profileOccupationSelector);
    }

    getUserInfo() {
        const userData = { name: this._nameElement.textContent, occupation: this._occupationElement.textContent };
        return userData;
    }

    setUserInfo(name, occupation) {
        this._nameElement.textContent = name;
        this._occupationElement.textContent = occupation;
    }
}