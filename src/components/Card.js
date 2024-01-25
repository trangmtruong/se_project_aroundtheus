export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleUnlikingIcon,
    handleLikingIcon
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._handleUnlikingIcon = handleUnlikingIcon;
    this._handleLikingIcon = handleLikingIcon;
    //moved into constructor
    // this._likeButton = this._cardElement.querySelector(".card__like-button");

    // this._cardElement = document
    //   .querySelector(this._cardSelector)
    //   .content.querySelector(".card")
    //   .cloneNode(true);
    // this._setLikeState();
    // this._handleDeleteClick = handleDeleteClick;

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
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked === true) {
        // call a function from index.js to unlike the button
        this._handleLikingIcon(this);
      } else {
        //otherwise you can call a different function form index.js to like the button
        this._handleUnlikingIcon(this);
      }
    });

    //".card__delete-button"
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    // this._deleteButton = this._cardElement.querySelector(
    //   ".card__delete-button"
    // );
    this._deleteButton.addEventListener("click", () => {
      //opens delete confirmation modal
      this._handleDeleteClick(this);
    });
    //".card__image"
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _setLikeState() {
    if (this._isLiked === true) {
      this._fillInLikeIcon();
    } else {
      this._clearLikeIcon();
    }
  }

  _fillInLikeIcon() {
    this._likeButton.classList.add("card__like-button_active");
  }
  _clearLikeIcon() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    //from getCardElement
    //get the card view
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setLikeState();
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
