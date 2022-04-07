export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this._contentType = options.headers['Content-Type'];
    }

    _request(methodApi, urlApi, dataObj, callback, buttonElement) {
        fetch(`${this._baseUrl}${urlApi}`, {
            method: methodApi,
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: dataObj ? JSON.stringify(dataObj) : undefined
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(callback)
            .catch((err) => {
                console.log(err);
                if (buttonElement) {
                    this.setNotLoading(buttonElement);
                }
            });
    }

    _setLoading(buttonElement) {
        buttonElement.textContent = "Сохранение...";
    }

    setNotLoading(buttonElement) {
        buttonElement.textContent = "Сохранить";
    }

    getInitialCards(callback) {
        this._request(
            'GET',
            'cards',
            '',
            callback,
            null
        )
    }

    getProfileInfo(callback) {
        this._request(
            'GET',
            'users/me',
            '',
            callback,
            null
        )
    }

    postNewCard(data, btn, callback) {
        this._setLoading(btn);
        this._request(
            'POST',
            'cards',
            {
                name: data['place-name'],
                link: data.link,
            },
            callback,
            btn
        );
    }

    patchProfileInfo(data, btn, callback) {
        const { name, occupation } = data;
        this._setLoading(btn);
        this._request(
            'PATCH',
            'users/me',
            {
                name: name,
                about: occupation
            },
            callback,
            btn
        );
    }

    patchProfileAvatar(data, btn, callback) {
        this._setLoading(btn);
        this._request(
            'PATCH',
            'users/me/avatar',
            {
                avatar: data.link,
            },
            callback,
            btn
        );
    }

    deleteLike(cardID, callback) {
        this._request(
            'DELETE',
            `cards/${cardID}/likes`,
            '',
            callback,
            null
        );
    }

    putLike(cardID, callback) {
        this._request(
            'PUT',
            `cards/${cardID}/likes`,
            '',
            callback,
            null
        );
    }
}