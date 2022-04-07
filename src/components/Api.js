export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this._contentType = options.headers['Content-Type'];
    }

    _request(methodApi, urlApi, dataObj, thenCallback, finallyCallback) {
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
            .then(thenCallback)
            .catch((err) => {
                console.log(err);
            })
            .finally(finallyCallback);
    }

    getInitialCards(thenCallback) {
        this._request(
            'GET',
            'cards',
            '',
            thenCallback
        )
    }

    getProfileInfo(thenCallback) {
        this._request(
            'GET',
            'users/me',
            '',
            thenCallback
        )
    }

    postNewCard(data, thenCallback, finallyCallback) {
        this._request(
            'POST',
            'cards',
            {
                name: data['place-name'],
                link: data.link,
            },
            thenCallback,
            finallyCallback
        );
    }

    deleteCard(cardID, thenCallback, finallyCallback) {
        this._request(
            'DELETE',
            `cards/${cardID}`,
            '',
            thenCallback,
            finallyCallback
        );
    }

    patchProfileInfo(data, thenCallback, finallyCallback) {
        const { name, occupation } = data;
        this._request(
            'PATCH',
            'users/me',
            {
                name: name,
                about: occupation
            },
            thenCallback,
            finallyCallback
        );
    }

    patchProfileAvatar(data, thenCallback, finallyCallback) {
        this._request(
            'PATCH',
            'users/me/avatar',
            {
                avatar: data.link,
            },
            thenCallback,
            finallyCallback
        );
    }

    deleteLike(cardID, thenCallback) {
        this._request(
            'DELETE',
            `cards/${cardID}/likes`,
            '',
            thenCallback
        );
    }

    putLike(cardID, thenCallback) {
        this._request(
            'PUT',
            `cards/${cardID}/likes`,
            '',
            thenCallback
        );
    }
}