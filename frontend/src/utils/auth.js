export const BASE_URL = 'https://api.mesto.place.nomoredomains.work';

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject('Произошла ошибка');
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return checkResponse(res);
  });
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res => checkResponse(res)))
    .then((data) => {
        localStorage.setItem('token', data.token);
        return data;
    })
  };

  export const getEmail = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      return checkResponse(res);
    });
  };