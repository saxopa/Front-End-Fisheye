import PhotographerService from "../services/photographerservice.js"; // Importation du service pour récupérer les données des photographes
import { Cardfactory } from "../factories/card.js"; // Importation de la fabrique de cartes pour afficher les médias
import { Lightboxfactory } from "../factories/lightbox.js"; // Importation de la fabrique de lightbox pour la visualisation des médias

const photographerService = new PhotographerService(); // Instanciation du service des photographes
const urlParams = new URLSearchParams(window.location.search); // Récupération des paramètres de l'URL
const id = urlParams.get("id"); // Extraction de l'ID du photographe à partir des paramètres de l'URL
let lightbox; // Variable pour stocker l'instance de la lightbox
let photographer; // Variable pour stocker les détails du photographe

async function main() {
  try {
    // Récupération des détails du photographe via le service
    photographer = await photographerService.getDetailsPhotographer(id);
    
    if (photographer) {
      console.log("Détails du photographe :", photographer); // Affichage des détails dans la console

      // Mise à jour du nom du photographe dans le modal
      const modalNomPhotographe = document.getElementById("modal-nom-photographe");
      if (modalNomPhotographe) {
        modalNomPhotographe.innerHTML = photographer.details.name; // Affichage du nom
      }

      // Mise à jour des informations affichées sur la page
      const NamePhotographer = document.getElementById("name-photographer");
      if (NamePhotographer) {
        NamePhotographer.innerText = photographer.details.name; // Affichage du nom
      }

      const cityPhotographer = document.getElementById("city-photographer");
      if (cityPhotographer) {
        cityPhotographer.innerText = `${photographer.details.city}, ${photographer.details.country}`; // Affichage de la ville et du pays
      }

      const tagPhotographer = document.getElementById("tagline-photographer");
      if (tagPhotographer) {
        tagPhotographer.innerText = photographer.details.tagline; // Affichage de la tagline
      }

      // Mise à jour de l'image de profil du photographe
      const imgPhotographer = document.getElementById("img-photographer");
      if (imgPhotographer) {
        const picture = `assets/photographers/${photographer.details.portrait}`; // Chemin de l'image
        imgPhotographer.src = picture; // Mise à jour de l'attribut src de l'image
      }

      // Affichage du tarif du photographe
      const containerLikesTarif = document.getElementById("container-likes-tarif");
      if (containerLikesTarif) {
        const tarifElement = document.createElement('p'); // Création d'un nouvel élément de paragraphe pour le tarif
        tarifElement.textContent = `${photographer.details.price}€ / jour`; // Affichage du tarif
        containerLikesTarif.appendChild(tarifElement); // Ajout de l'élément dans le conteneur
      }

      // Mise à jour des likes totaux et affichage des médias par défaut (triés par likes)
      await updateTotalLikes(id);
      await updateMediaDisplay('likes');

      // Gestion de l'affichage du menu de tri
      const buttonTrier = document.querySelector("#button-trier"); // Bouton de tri
      const sortOptions = document.getElementById('sort-options'); // Options de tri
      
      if (buttonTrier && sortOptions) {
        // Événement au clic sur le bouton de tri
        buttonTrier.addEventListener('click', () => {
          console.log("Bouton de tri cliqué");
          const isExpanded = buttonTrier.getAttribute('aria-expanded') === 'true'; // Vérifie si le menu est déjà ouvert
          buttonTrier.setAttribute('aria-expanded', !isExpanded); // Inverse l'état d'ouverture
          sortOptions.hidden = isExpanded; // Affiche ou masque les options de tri
        });

        // Événement au clic sur les options de tri
        sortOptions.addEventListener('click', async (event) => {
          const button = event.target.closest('button'); // Vérifie quel bouton a été cliqué
          if (button) {
            console.log("Option de tri cliquée:", button.dataset.sort); // Affiche le type de tri sélectionné
            const sortBy = button.dataset.sort; // Récupération de la valeur de tri
            await updateMediaDisplay(sortBy); // Mise à jour de l'affichage des médias en fonction du tri
            
            // Mise à jour de l'état sélectionné des options de tri
            sortOptions.querySelectorAll('button').forEach(option => {
              option.setAttribute('aria-selected', option.dataset.sort === sortBy); // Sélectionne l'option courante
            });
            
            buttonTrier.setAttribute('aria-expanded', 'false'); // Ferme le menu
            sortOptions.hidden = true; // Masque les options de tri
          }
        });
      }

      // Initialisation du système de likes pour le photographe
      initializeLikeSystem(photographerService, id);

      // Gestion de la navigation dans la lightbox
      const closeButton = document.querySelector(".close-carousel"); // Bouton pour fermer la lightbox
      const nextButton = document.querySelector(".next"); // Bouton pour aller au média suivant
      const prevButton = document.querySelector(".prev"); // Bouton pour revenir au média précédent

      // Événements de clic pour contrôler la lightbox
      if (closeButton) closeButton.onclick = () => lightbox.closeCarousel();
      if (nextButton) nextButton.onclick = () => lightbox.showNextMedia();
      if (prevButton) prevButton.onclick = () => lightbox.showPrevMedia();

      // Gestion des événements au clavier pour naviguer dans la lightbox
      document.addEventListener('keydown', (event) => {
        switch(event.key) {
          case 'ArrowLeft':
            if (prevButton) lightbox.showPrevMedia(); // Navigation vers le média précédent
            break;
          case 'ArrowRight':
            if (nextButton) lightbox.showNextMedia(); // Navigation vers le média suivant
            break;
          case 'Escape':
            if (closeButton) lightbox.closeCarousel(); // Fermeture de la lightbox
            break;
        }
      });

    } else {
      console.log("Aucun photographe trouvé avec cet ID :", id); // Message d'erreur si aucun photographe n'est trouvé
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des détails du photographe :", error); // Gestion des erreurs lors de la récupération des données
  }
}

// Fonction pour mettre à jour l'affichage des médias en fonction de l'option de tri sélectionnée
async function updateMediaDisplay(sortBy) {
  console.log("Updating media display with sort:", sortBy); // Affichage du type de tri utilisé
  const cardFactory = new Cardfactory(); // Création d'une instance de la fabrique de cartes
  const mainElement = document.getElementById("main"); // Récupération de l'élément principal où les cartes seront affichées
  

  
  let cardElement = mainElement.querySelector(".container-cards"); // Récupération de l'élément contenant les cartes
  if (!cardElement) {
    // Création d'un nouvel élément pour contenir les cartes s'il n'existe pas déjà
    cardElement = document.createElement('div');
    cardElement.className = 'container-cards';
    mainElement.appendChild(cardElement); // Ajout de l'élément au DOM
  }
  
  cardElement.innerHTML = ''; // Réinitialisation du contenu des cartes

  // Tri des médias en fonction de l'option sélectionnée
  const sortedMedia = await photographerService.sortMedia(photographer.media, sortBy);
  for (const media of sortedMedia) {
    // Génération et ajout de chaque carte pour les médias triés
    const cardHtml = await cardFactory.generateCard(media, photographer.details.name, photographerService);
    cardElement.innerHTML += cardHtml; // Ajout du code HTML de la carte au conteneur
  }

  // Initialisation de la lightbox avec les médias triés
  lightbox = new Lightboxfactory({ media: sortedMedia }, photographer.details.name);

  // Ajout d'un événement de clic à chaque carte pour ouvrir la lightbox
  document.querySelectorAll(".card-img-top, .card-video").forEach((card, index) => {
    card.addEventListener("click", () => {
      lightbox.showCarousel(index); // Ouverture de la lightbox sur le média cliqué
    });
  });

  // Mise à jour de l'affichage de l'option de tri actuelle
  const currentSortElement = document.getElementById('current-sort');
  if (currentSortElement) {
    currentSortElement.textContent = document.querySelector(`#sort-options button[data-sort="${sortBy}"]`)?.textContent || "Popularité";
  }
}

// Fonction pour initialiser le système de likes
function initializeLikeSystem(photographerService, photographerId) {
  // Écouteur d'événements pour les clics sur les boutons de like
  document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('like-button')) {
      const mediaId = parseInt(event.target.getAttribute('data-media-id')); // Récupération de l'ID du média
      const likesCountElement = document.querySelector(`.likes-count[data-media-id="${mediaId}"]`); // Récupération de l'élément affichant le nombre de likes
      
      if (likesCountElement) {
        try {
          // Mise à jour des likes du média
          const updatedMedia = await photographerService.updateLike(mediaId, 1);
          likesCountElement.textContent = updatedMedia.likes; // Mise à jour de l'affichage des likes
          event.target.classList.add('liked'); // Ajout de la classe 'liked' au bouton
          await updateTotalLikes(photographerId); // Mise à jour du total des likes pour le photographe
        } catch (error) {
          console.error("Erreur lors de la mise à jour du like :", error); // Gestion des erreurs lors de la mise à jour des likes
        }
      }
    }
  });
}

// Fonction pour mettre à jour le total des likes du photographe
async function updateTotalLikes(photographerId) {
  const updatedPhotographer = await photographerService.getDetailsPhotographer(photographerId); // Récupération des détails actualisés du photographe
  const totalLikesElement = document.querySelector(".container-like"); // Récupération de l'élément affichant le total des likes
  if (totalLikesElement) {
    totalLikesElement.textContent = `${updatedPhotographer.totalLikes} ♥`; // Mise à jour de l'affichage du total des likes
  }
}

// Lancement de la fonction principale lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', main);
