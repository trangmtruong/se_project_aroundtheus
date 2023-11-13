import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/***Elements */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseModal = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const profileTitleInput = document.querySelector("#edit-title-input");
const profileDescriptionInput = document.querySelector(
  "#edit-description-input"
);
const addCardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const addCardUrlInput = addCardForm.querySelector(".modal__input_type_url");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector(
  "#preview-image-close-modal"
);
const imgEl = previewImageModal.querySelector(".modal__image");
const previewTitleEl = previewImageModal.querySelector(".modal__preview-title");

//Objects
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editProfileValidator = new FormValidator(config, "#profile-edit-form");
const addCardValidator = new FormValidator(config, "#add-card-form");

/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}
// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);

//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   // likeButton.addEventListener("click", () => {
//   //   likeButton.classList.toggle("card__like-button_active");
//   // });
//   // deleteButton.addEventListener("click", () => {
//   //   cardElement.remove();
//   // });
//   cardImageEl.addEventListener("click", () => {
//     openPopup(previewImageModal);
//     imgEl.src = cardData.link;
//     imgEl.alt = cardData.name;
//     previewTitleEl.textContent = cardData.name;
//   });

//   cardImageEl.src = cardData.link;

//   cardImageEl.alt = cardData.name;

//   cardTitleEl.textContent = cardData.name;

//   return cardElement;
// }
previewImageModalClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);
function handleImageClick(data) {
  imgEl.src = data.link;
  imgEl.alt = data.name;
  previewTitleEl.textContent = data.name;
  openPopup(previewImageModal);
}
function renderCard(data, wrapper) {
  const cardElement = getCardElement(data);
  wrapper.prepend(cardElement);
}

/* Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  //
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  };
  //renderCard({ name, link }, cardListEl);
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);

  closePopup(addCardModal);
  addCardForm.reset();
  addCardValidator.resetValidation();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
  openPopup(profileEditModal);
});
profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));

// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

//Add New Card Button

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

//Close Modal Functions
function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}
function closeModalOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the modal
  // if they are the same then we should close the modal
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.target);
  }
}

//Initialization
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.append(cardElement);
});
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
