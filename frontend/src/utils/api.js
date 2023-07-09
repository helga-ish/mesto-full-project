class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
        method: 'GET',
        headers: this._headers,
    }).then((res) => {
        return this._checkResponse(res);
    });
    }

    getProfileUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    changeProfileUserInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    editAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    addCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    changeLikeStatus(cardId, like) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

}

const api = new Api({
    url: 'https://api.mesto.place.nomoredomains.work',
    headers: {
    //   Authorization: '4471ba4a-88e3-4225-a99c-10facf8d16dd',
      'content-type': 'application/json'
    }
})

export default api;