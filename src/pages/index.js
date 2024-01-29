import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import "./index.css";

/***Elements */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#add-card-modal");

const addCardForm = addCardModal.querySelector(".modal__form");

const addNewCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");

// const editAvatarModal = document.querySelector("#edit-avatar-modal");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5f364a70-6354-4d7f-b3e1-21a8fcface2d",
    "Content-Type": "application/json",
  },
});
const editProfileValidator = new FormValidator(config, "#profile-edit-form");
const addCardValidator = new FormValidator(config, "#add-card-form");
const editAvatarValidator = new FormValidator(config, "#edit-avatar-form");

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleEditAvatarSubmit
);
const previewImagePopup = new PopupWithImage("#preview-image-modal");
const deleteConfirmationPopup = new PopupWithConfirmation(
  "#delete-confirmation-modal"
);
const profileUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/* Event Handlers */
function handleEditAvatarSubmit(inputValues) {
  editAvatarPopup.renderLoadingSave(true);
  api
    .updateAvatar(inputValues.link)
    .then((res) => {
      profileUserInfo.setUserAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}. Failed to edit avatar :(`); // log the error to the console
    })
    .finally(() => {
      editAvatarPopup.renderLoadingSave(false);
    });
}

function handleImageClick(data) {
  previewImagePopup.open(data.name, data.link);
}

function handleProfileEditSubmit(inputValues) {
  editProfilePopup.renderLoadingSave(true);
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
    })
    .finally(() => {
      editProfilePopup.renderLoadingSave(false);
    });
}

//likes button
function handleLikingIcon(card) {
  //fetch to like card on server
  api
    .likeCard(card._id)

    //if successful. we like card locally
    .then(() => {
      card.fillInLikeIcon();
      card.isLiked = false;
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}. Failed to like card :(`);
    });
}
//unlikes button
function handleUnlikingIcon(card) {
  //delete like on server
  api
    .dislikeCard(card._id)
    //if successfull, unlike card locally
    .then(() => {
      card.clearLikeIcon();
      this.isLiked = true;
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}. Failed to unlike card :(`);
    });
}

//delete confimation function
//runs when you click the trash button
function handleDeleteClick(card) {
  //runs when you click yes on the delete confirm modal
  function handleDeleteConfirmationSubmit() {
    //delete card on server
    api
      .deleteCard(card._id)
      .then(() => {
        deleteConfirmationPopup.close();
        //deletes card locally
        card.handleDeleteCard();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}. Failed to delete card :(`);
      });
  }

  //open the delete confirm modal
  deleteConfirmationPopup.open();
  deleteConfirmationPopup.setSubmitHandler(handleDeleteConfirmationSubmit);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleUnlikingIcon,
    handleLikingIcon
  );
  return card.getCardElement();
}

function handleAddCardSubmit(inputValues) {
  addCardPopup.renderLoadingCreate(true);
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
      alert(`${err}. Failed to add new card :(`);
    })
    .finally(() => {
      addCardPopup.renderLoadingCreate(false);
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
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});
//Add New Card Button

addNewCardButton.addEventListener("click", () => addCardPopup.open());

//Initialization

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

const cardSection = new Section(
  { items: [], renderer: createCard },
  ".cards__list"
);

api
  .getInitialCards()
  .then((cards) => {
    // process the result
    cardSection.setItems(cards.reverse());
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
    alert(`${err}. Failed to load cards :(`); // log the error to the console
  });

api
  .getUsersInfo()

  .then((data) => {
    profileUserInfo.setUserAvatar(data.avatar);
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
