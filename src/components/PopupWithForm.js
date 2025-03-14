import Popup from "./Popup.js";
// child of Popup
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = [...this._popupElement.querySelectorAll(".modal__input")];
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this.setEventListeners();
    //It accepts two arguments: the popup selector and a callback function
    // which PopupWithForm calls when the form’s submit event fires.
  }
  renderLoading(isLoading, loadingText = "Saving...") {
    // // const submitButton = this._popupForm.querySelector(".modal__button");
    // if (loading) {
    //   submitButton.textContent = "Saving...";
    // } else {
    //   submitButton.textContent = "Save";
    // }

    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      // here we return back the initial text. So, you don’t need to bother yourself about it
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    //which collects data from all the input fields and returns it as an object
    //this data should then be passed to the submission handler as an argument
    const inputValues = {};
    this._inputEls.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setInputValues(arr) {
    for (let i = 0; i < arr.length; i++) {
      this._inputEls[i].value = arr[i];
    }
  }

  setEventListeners() {
    //It overrides the setEventListeners() parent method
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //this.close();
    });
    //The setEventListeners() method of the PopupWithForm class should add a submit event listener to the form
    //and call the setEventListeners() method of the parent class
  }

  // renderLoading(loading) {
  //   // const submitButton = this._popupForm.querySelector(".modal__button");
  //   if (loading) {
  //     submitButton.textContent = "Saving...";
  //   } else {
  //     submitButton.textContent = "Save";
  //   }
  // }
}
