import { initialCards } from "../utils/constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
    //throw new Error(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUsersInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      //check server response
      return this._checkResponse(res);
    });
  }

  updateProfileInfo({ title, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then((res) => {
      //check server response
      return this._checkResponse(res);
    });
  }

  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
      //   body: JSON.stringify({
      // isLiked: data.isLiked,
      // id: data._id,
      //   }),
    }).then((res) => {
      //check server response
      return this._checkResponse(res);
    });
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      //check server response
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //   User routes
  // GET /users/me – Get the current user’s info DONE
  // PATCH /users/me – Update your profile information
  // PATCH /users/me/avatar – Update avatar

  // Card routes
  // // GET /cards – Get all cards DONE
  // POST /cards – Create a card
  // DELETE /cards/:cardId – Delete a card
  // PUT /cards/:cardId/likes – Like a card
  // DELETE /cards/:cardId/likes – Dislike a card
}
