//child of Popup

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageEl = this._popupElement.querySelector(".modal__image");
    this._captionEl = this._popupElement.querySelector(".modal__preview-title");
    this.setEventListeners();
  }
  //The open() method of the PopupWithImage class will need to accept the name and link of the card as arguments
  //and add an image to the popup and the corresponding image src attribute along with a caption for the image
  // This method should be called in your image click handler in index.js.
  open(name, link) {
    // set the image's src and alt
    // set the caption's textContent
    this._imageEl.src = link;
    this._imageEl.alt = name;
    this._captionEl.textContent = name;
    super.open();
  }
}
