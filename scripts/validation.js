// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelectorAll(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classlist.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelectorAll(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classlist.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);

//red error message displayed if not passing validation ??
//use default error messages from browser ??
//if ANY field doesnt pass validation >> inactive
//see Figma for colors of inactive button ??
//button should be inactive when open modal with no values

/*
const formElement = document.querySelector(config.formSelector);
const formInput = formElement.querySelector(config.inputSelector);
errorMessage = formElement.querySelectorAll(config.inputErrorClass);
*/

/*
const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
};

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = "";
};

const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};
/*
const hasInvalidInput = ();
const toggleButtonState = ();
*/
//Event Handlers
/*
const setEventListeners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options); //??
  });
};

enableValidation(config);

//closing popup by pressing on overlay
//closing popup by pressing esc
*/
