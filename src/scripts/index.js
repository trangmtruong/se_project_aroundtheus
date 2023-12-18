import Card from "../../components/Card.js";
import FormValidator from "../../components/FormValidator.js";
import Section from "../../components/Section.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import UserInfo from "../../components/UserInfo.js";
import "../pages/index.css";
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

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const previewImagePopup = new PopupWithImage("#preview-image-modal");
const profileUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleImageClick(data) {
  previewImagePopup.open(data.name, data.link);
}

/* Event Handlers */
function handleProfileEditSubmit(inputValues) {
  //should be handled by userinfo class
  profileUserInfo.setUserInfo(inputValues.title, inputValues.description);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleAddCardSubmit(inputValues) {
  //e.preventDefault();

  // const cardData = {
  //   name: addCardTitleInput.value,
  //   link: addCardUrlInput.value,
  // };
  //renderCard({ name, link }, cardListEl);
  cardSection.addItem(inputValues);

  addCardPopup.close();
  addCardForm.reset();
  addCardValidator.resetValidation();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  // profileTitleInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  //what's inside of arr should be gotten by the useinfo class
  debugger;
  const userInfo = profileUserInfo.getUserInfo();
  const arr = [userInfo.name, userInfo.job];
  editProfilePopup.setInputValues(arr);
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});
////profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));

// Form Listeners

//Add New Card Button

addNewCardButton.addEventListener("click", () => addCardPopup.open());
// addCardModalCloseButton.addEventListener("click", () =>
//   closePopup(addCardModal)
// );

//Close Modal Functions
// function closeModalByEscape(e) {
//   if (e.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closePopup(openedModal);
//   }
// }
// function closeModalOnRemoteClick(evt) {
//   // target is the element on which the event happened
//   // currentTarget is the modal
//   // if they are the same then we should close the modal
//   console.log(evt);
//   if (
//     evt.target === evt.currentTarget ||
//     evt.target.classList.contains("modal__close")
//   ) {
//     closePopup(evt.target);
//   }
// }

//Initialization
// initialCards.forEach((cardData) => {
//   const cardElement = createCard(cardData);
//   cardListEl.append(cardElement);
// });

cardSection.renderItems();

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
