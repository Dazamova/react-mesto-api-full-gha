import { authConfig } from "./constants.js";

function ApiConstructor(config) {

  ApiConstructor.prototype.checkResponse = function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // регистрация пользователя - signUp
  ApiConstructor.prototype.signUp = (data) => {
    return fetch(`${config.baseUrl}/signup`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => { return this.checkResponse(res) });
  }
  // авторизация пользователя - signIn
  ApiConstructor.prototype.signIn = (data) => {
    return fetch(`${config.baseUrl}/signin`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => { return this.checkResponse(res) });
  }

  ApiConstructor.prototype.checkAuth = (token) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    }).then((res) => { return this.checkResponse(res) });
  }
}

export const authApi = new ApiConstructor(authConfig);
