export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    // this._cardElement = document
    //   .querySelector(this._cardSelector)
    //   .content.querySelector(".card")
    //   .cloneNode(true);
    // this._cardImage = this._cardElement.querySelector(".card__image");
    // this._cardTitle = this._cardElement.querySelector(".card__title");
    // this._likeButton = this._cardElement.querySelector(".card__like-button");
    // this._deleteButton = this._cardElement.querySelector(
    //   ".card__delete-button"
    // );
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    //".card__delete-button"
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    //".card__image"
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    //from getCardElement
    //get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    //set event listeners
    this._setEventListeners();
    return this._cardElement;
  }
}
