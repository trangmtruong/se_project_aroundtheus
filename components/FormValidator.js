export default class FormValidator {
  constructor(config, formSelector) {
    this._element = config.formSelector,
  this._inputSelector = config.inputSelector,
  this._submitButtonSelector = config.submitButtonSelector,
  this._inactiveButtonClass = config.inactiveButtonClass,
  this._inputErrorClass = config.inputErrorClass,
  this._errorClass = config.errorClass,
  }
  _showInputError() {}
  _hideInputError() {}
  _setEventListeners() {}
  _checkInputValidity() {}
  _hasInvalidInput() {}
  enableValidation() {}

  toggleButtonState() {}
}
