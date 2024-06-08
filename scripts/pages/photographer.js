import PhotographerService from "../services/photographerservice.js";
import { Cardfactory } from "../factories/card.js";

// Création d'une instance de PhotographerService
const photographerService = new PhotographerService();

// récupérer l'id dans l'URL de ce type photographer.html?id=123
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

// appeler le service et utiliser la fonction getDetailsPhotographer(id)
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

      //Infos texte photographe
      const NamePhotographer = document.getElementById("name-photographer");
      NamePhotographer.innerText = name;

      const cityPhotographer = document.getElementById("city-photographer");
      cityPhotographer.innerText = photographer.details.city + ", " + photographer.details.country;

      const tagPhotographer = document.getElementById("tagline-photographer");
      tagPhotographer.innerText = photographer.details.tagline;

      // image profil photographe
      const imgPhotographer = document.getElementById("img-photographer");
      const picture = `assets/photographers/${photographer.details.portrait}`;
      imgPhotographer.src = picture;

      photographer.media.forEach((media) => {
        const cardHtml = cardFactory.generateCard(media, name);
        cardElement.innerHTML += cardHtml;
      });
      cardsContainer.appendChild(cardElement); // Déplacez cet ajout à l'extérieur de la boucle forEach
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

  let buttonModal = document.getElementsByClassName("contact_button")[1];


  buttonModal.addEventListener("click", (e) => {
    e.preventDefault();
   console.log("coucou")
 });