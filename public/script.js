const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const scrollDown = document.querySelector(".scroll-down");
let isOpened = false;

const openModal = () => {
  modal.classList.add("is-open");
  body.style.overflow = "hidden";
  isOpened = true;
};

const closeModal = () => {
  modal.classList.remove("is-open");
  body.style.overflow = "initial";
  isOpened = false;
};

// Ouvrir le modal lorsque l'utilisateur fait défiler jusqu'à un tiers de la page
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 3 && !isOpened) {
    scrollDown.style.display = "none";
    openModal();
  }
});

// Fermer le modal lorsqu'on clique en dehors de celui-ci
body.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

// Gérer l'ouverture du modal lorsqu'on clique sur le bouton
modalButton.addEventListener("click", openModal);

// Gérer la fermeture du modal lorsqu'on clique sur le bouton de fermeture
closeButton.addEventListener("click", closeModal);

// Gérer la fermeture du modal lorsque l'utilisateur appuie sur la touche 'Escape'
document.addEventListener("keydown", evt => {
  if (evt.key === "Escape" && isOpened) {
    closeModal();
  }
});
// Fermer le modal lorsqu'on clique en dehors de celui-ci
body.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});
