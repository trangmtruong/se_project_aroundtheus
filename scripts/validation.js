// enabling validation by calling enableValidation()
// pass all the settings on call

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formElement = document.querySelector(config.formSelector);
const formInput = formElement.querySelector(config.inputSelector);

const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`${formInput.id}-error`);
  formInput.classList.add("modal__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("modal__error_visible");
};

const hideInputError = (element) => {
  const formError = formElement.querySelector(`${formInput.id}-error`);
  formInput.classList.remove("modal__input_type_error");
  formError.classList.remove("modal__error_visible");
  formError.textContent = "";
};

const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
formInput.addEventListener("input", checkInputValidity);
