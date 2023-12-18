export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  //The open() method should be called in the preexisting event handlers in index.js

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    //closing the popup by pressing the Esc key
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //adds a click event listener to the close icon of the popup
    //The modal window should also close when users click on the shaded area around the form.
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target === this._closeButton || e.target === this._popupElement) {
        this.close();
      }
    });
  }
}
//You won’t instantiate your Popup class directly in index.js
// instead, you’ll instantiate its children classes
