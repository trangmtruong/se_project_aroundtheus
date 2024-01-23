//child of Popup
import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupConfirmationForm = this._popupElement.querySelector(
      "#delete-confirmation-form"
      //what if just confirmation forms?
    );
  }
  //set delete form method
  setEventListeners() {
    super.setEventListeners();
    this._popupConfirmationForm.addEventListener("submit"),
      () => {
        e.preventDefault();
        //deletes card
      };
  }
}
