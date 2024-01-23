import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import "./index.css";

/***Elements */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#add-card-modal");

const addCardForm = addCardModal.querySelector(".modal__form");

const addNewCardButton = document.querySelector(".profile__add-button");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5f364a70-6354-4d7f-b3e1-21a8fcface2d",
    "Content-Type": "application/json",
  },
});
const editProfileValidator = new FormValidator(config, "#profile-edit-form");
const addCardValidator = new FormValidator(config, "#add-card-form");

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

  api
    .updateProfileInfo(inputValues) //{title: ddd, description: kk}
    .then((data) => {
      profileUserInfo.setUserInfo(inputValues.title, inputValues.description);
      editProfilePopup.close();
      //profileUserInfo.setUserInfo(data.name, data.about);
      //console.log("Name:", data.name, "Job:", data.about);
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}. Failed to update profile info :(`); // log the error to the console
    });
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleAddCardSubmit(inputValues) {
  api
    .createCard(inputValues)
    .then((data) => {
      cardSection.addItem(data);
      addCardPopup.close();
      addCardForm.reset();
      addCardValidator.resetValidation();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}. Failed to add new card :(`); // log the error to the console
    });
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  //what's inside of arr should be gotten by the useinfo class

  const userInfo = profileUserInfo.getUserInfo();
  const arr = [userInfo.name, userInfo.job];
  editProfilePopup.setInputValues(arr);
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

// Form Listeners

//Add New Card Button

addNewCardButton.addEventListener("click", () => addCardPopup.open());

//Initialization

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const cardSection = new Section(
  { items: [], renderer: createCard },
  ".cards__list"
);

api
  .getInitialCards()
  .then((cards) => {
    // process the result
    cardSection.setItems(cards);
    cardSection.renderItems();
    console.log(cards);
  })
  .catch((err) => {
    console.error(err);
    alert(`${err}. Failed to load cards :(`); // log the error to the console
  });

api
  .getUsersInfo()
  .then((data) => {
    profileUserInfo.setUserInfo(data.name, data.about);
  })
  .catch((err) => {
    console.error(err);
    alert(`${err}. Failed to get user info :(`); // log the error to the console
  });

// api

//   .likeCard(inputValues)
//   .then((data) => {
//     const card = new Card(cardData, "#card-template", handleImageClick);
//     card._handleLikeIcon();
//   })
//   .catch((err) => {
//     console.error(err);
//     alert(`${err}. Failed to like card :(`); // log the error to the console
//   });
