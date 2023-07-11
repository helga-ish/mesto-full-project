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
        return fetch(`${this._url}/cards`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json'
          },
    }).then((res) => {
        return this._checkResponse(res);
    });
    }

    getProfileUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            mode: "cors",
            credentials: 'include',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    changeProfileUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            mode: "cors",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    changeLikeStatus(cardId, like) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'application/json'
              },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

}

const api = new Api({
    url: 'https://api.mesto.place.nomoredomains.work',
})

export default api;