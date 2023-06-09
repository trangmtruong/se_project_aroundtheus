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
/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imgEl = previewImageModal.querySelector(".modal__image");
  const previewTitleEl = previewImageModal.querySelector(
    ".modal__preview-title"
  );
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    imgEl.src = cardData.link;
    imgEl.src = cardData.link;
    previewTitleEl.textContent = cardData.name;
  });
  /* previewImageModalClose.addEventListener("click", () =>
    closePopup(previewImageModal)
  ); */
  cardImageEl.src = cardData.link;

  cardImageEl.alt = cardData.name;

  cardTitleEl.textContent = cardData.name;

  return cardElement;
}
previewImageModalClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
/* Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardListEl);

  closePopup(addCardModal);
  addCardForm.reset();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));
// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
//add New Card Button

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);
