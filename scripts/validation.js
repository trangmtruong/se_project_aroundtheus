// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (hasInvalidInput(inputEl)) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputEl) {
  return !inputEl.validity.valid;
}

/*
function enableButton
function disableButton
*/

function toggleButtonState(inputEl, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEl)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEl, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

//closing popup by pressing on overlay

profileEditModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(profileEditModal);
  }
});
addCardModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(addCardModal);
  }
});

//Close Popup by Esc

document.addEventListener("keydown", (e) => {
  const modal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    closePopup(profileEditModal);
  }
});
document.addEventListener("keydown", (e) => {
  const modal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    closePopup(addCardModal);
  }
});
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
