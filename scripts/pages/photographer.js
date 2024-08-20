import PhotographerService from "../services/photographerservice.js";
import { Cardfactory } from "../factories/card.js";
import { Lightboxfactory } from "../factories/lightbox.js";

// Création d'une instance de PhotographerService
const photographerService = new PhotographerService();

// Récupérer l'id dans l'URL de ce type photographer.html?id=123
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

// Appeler le service et utiliser la fonction getDetailsPhotographer(id)
photographerService
  .getDetailsPhotographer(id)
  .then((photographer) => {
    if (photographer) {
      console.log("Détails du photographe :", photographer);
      const cardFactory = new Cardfactory();
      const cardsContainer = document.getElementById("main");
      const name = photographer.details.name;
      const cardElement = document.createElement("div");
      cardElement.setAttribute("class", "container-cards");

      // Nom modal
      let modalNomPhotographe = document.getElementById("modal-nom-photographe");
      modalNomPhotographe.innerHTML = name;

      // Infos texte photographe
      const NamePhotographer = document.getElementById("name-photographer");
      NamePhotographer.innerText = name;

      const cityPhotographer = document.getElementById("city-photographer");
      cityPhotographer.innerText = photographer.details.city + ", " + photographer.details.country;

      const tagPhotographer = document.getElementById("tagline-photographer");
      tagPhotographer.innerText = photographer.details.tagline;

      // Image profil photographe
      const imgPhotographer = document.getElementById("img-photographer");
      const picture = `assets/photographers/${photographer.details.portrait}`;
      imgPhotographer.src = picture;
      let cardHtml = "";

      photographer.media.forEach((media) => {
        cardHtml = cardFactory.generateCard(media, name);
        cardElement.innerHTML += cardHtml;
      });
      cardsContainer.appendChild(cardElement);

      // Créer une instance de Lightboxfactory
      const lightbox = new Lightboxfactory(photographer.media, name);
      console.log(photographer.media);

      // Attacher les méthodes de la lightbox aux événements des boutons
      document.querySelector(".close-carousel").onclick = () => lightbox.closeCarousel();
      document.querySelector(".next").onclick = () => lightbox.showNextMedia();
      document.querySelector(".prev").onclick = () => lightbox.showPrevMedia();

      // Attacher les événements de clic aux éléments de la galerie
      document.querySelectorAll(".card-img-top, .card-video").forEach((card, index) => {
        card.addEventListener("click", () => {
          lightbox.showCarousel(index);
        });
      });
    } else {
      console.log("Aucun photographe trouvé avec cet ID :", id);
    }
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des détails du photographe :",
      error
    );
  });