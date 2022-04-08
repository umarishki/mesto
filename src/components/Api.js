export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this._contentType = options.headers['Content-Type'];
    }

    _request(methodApi, urlApi, dataObj) {
        return fetch(`${this._baseUrl}${urlApi}`, {
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
    }

    getInitialCards() {
        return this._request(
            'GET',
            'cards',
            undefined
        )
    }

    getProfileInfo() {
        return this._request(
            'GET',
            'users/me',
            undefined
        )
    }

    postNewCard(data) {
        return this._request(
            'POST',
            'cards',
            {
                name: data['place-name'],
                link: data.link,
            }
        );
    }

    deleteCard(cardID) {
        return this._request(
            'DELETE',
            `cards/${cardID}`,
            undefined
        );
    }

    patchProfileInfo(data) {
        const { name, occupation } = data;
        return this._request(
            'PATCH',
            'users/me',
            {
                name: name,
                about: occupation
            }
        );
    }

    patchProfileAvatar(data) {
        return this._request(
            'PATCH',
            'users/me/avatar',
            {
                avatar: data.link,
            }
        );
    }

    deleteLike(cardID) {
        return this._request(
            'DELETE',
            `cards/${cardID}/likes`,
            undefined
        );
    }

    putLike(cardID) {
        return this._request(
            'PUT',
            `cards/${cardID}/likes`,
            undefined
        );
    }
}