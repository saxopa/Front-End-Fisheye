import PhotographerService from "../services/photographerservice.js";
import { Cardfactory } from "../factories/card.js";
import { Lightboxfactory } from "../factories/lightbox.js";

const photographerService = new PhotographerService();
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let lightbox;
let photographer;


async function main() {
  try {
    photographer = await photographerService.getDetailsPhotographer(id);
    
    if (photographer) {
      console.log("Détails du photographe :", photographer);

      // Nom modal
      let modalNomPhotographe = document.getElementById("modal-nom-photographe");
      if (modalNomPhotographe) {
        modalNomPhotographe.innerHTML = photographer.details.name;
      }

      // Infos texte photographe
      const NamePhotographer = document.getElementById("name-photographer");
      if (NamePhotographer) {
        NamePhotographer.innerText = photographer.details.name;
      }

      const cityPhotographer = document.getElementById("city-photographer");
      if (cityPhotographer) {
        cityPhotographer.innerText = `${photographer.details.city}, ${photographer.details.country}`;
      }

      const tagPhotographer = document.getElementById("tagline-photographer");
      if (tagPhotographer) {
        tagPhotographer.innerText = photographer.details.tagline;
      }

      // Image profil photographe
      const imgPhotographer = document.getElementById("img-photographer");
      if (imgPhotographer) {
        const picture = `assets/photographers/${photographer.details.portrait}`;
        imgPhotographer.src = picture;
      }

      const containerLikesTarif = document.getElementById("container-likes-tarif");
      if (containerLikesTarif) {
        const tarifElement = document.createElement('p');
        tarifElement.textContent = `${photographer.details.price}€ / jour`;
        containerLikesTarif.appendChild(tarifElement);
      }


      await updateTotalLikes(id)
      await updateMediaDisplay('likes');

      const buttonTrier = document.querySelector(".dropdown > button");
      const sortOptions = document.getElementById('sort-options');
      
      if (buttonTrier && sortOptions) {
        buttonTrier.addEventListener('click', () => {
          console.log("Bouton de tri cliqué");
          const isExpanded = buttonTrier.getAttribute('aria-expanded') === 'true';
          buttonTrier.setAttribute('aria-expanded', !isExpanded);
          sortOptions.hidden = isExpanded;
        });

        sortOptions.addEventListener('click', async (event) => {
          const button = event.target.closest('button');
          if (button) {
            console.log("Option de tri cliquée:", button.dataset.sort);
            const sortBy = button.dataset.sort;
            await updateMediaDisplay(sortBy);
            
            sortOptions.querySelectorAll('button').forEach(option => {
              option.setAttribute('aria-selected', option.dataset.sort === sortBy);
            });
            
            buttonTrier.setAttribute('aria-expanded', 'false');
            sortOptions.hidden = true;
          }
        });
      }

      initializeLikeSystem(photographerService, id);

      const closeButton = document.querySelector(".close-carousel");
      const nextButton = document.querySelector(".next");
      const prevButton = document.querySelector(".prev");

      if (closeButton) closeButton.onclick = () => lightbox.closeCarousel();
      if (nextButton) nextButton.onclick = () => lightbox.showNextMedia();
      if (prevButton) prevButton.onclick = () => lightbox.showPrevMedia();

      document.addEventListener('keydown', (event) => {
        switch(event.key) {
          case 'ArrowLeft':
            if (prevButton) lightbox.showPrevMedia();
            break;
          case 'ArrowRight':
            if (nextButton) lightbox.showNextMedia();
            break;
          case 'Escape':
            if (closeButton) lightbox.closeCarousel();
            break;
        }
      });

    } else {
      console.log("Aucun photographe trouvé avec cet ID :", id);
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des détails du photographe :", error);
  }
}


async function updateMediaDisplay(sortBy) {
  console.log("Updating media display with sort:", sortBy);
  const cardFactory = new Cardfactory();
  const mainElement = document.getElementById("main");
  
  if (!mainElement) {
    console.error("L'élément #main n'a pas été trouvé dans le DOM");
    return;
  }
  
  let cardElement = mainElement.querySelector(".container-cards");
  if (!cardElement) {
    cardElement = document.createElement('div');
    cardElement.className = 'container-cards';
    mainElement.appendChild(cardElement);
  }
  
  cardElement.innerHTML = '';

  const sortedMedia = await photographerService.sortMedia(photographer.media, sortBy);
  for (const media of sortedMedia) {
    const cardHtml = await cardFactory.generateCard(media, photographer.details.name, photographerService);
    cardElement.innerHTML += cardHtml;
  }

  lightbox = new Lightboxfactory({ media: sortedMedia }, photographer.details.name);

  document.querySelectorAll(".card-img-top, .card-video").forEach((card, index) => {
    card.addEventListener("click", () => {
      lightbox.showCarousel(index);
    });
  });

  const currentSortElement = document.getElementById('current-sort');
  if (currentSortElement) {
    currentSortElement.textContent = document.querySelector(`#sort-options button[data-sort="${sortBy}"]`)?.textContent || "Popularité";
  }
}


function initializeLikeSystem(photographerService, photographerId) {
  document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('like-button')) {
      const mediaId = parseInt(event.target.getAttribute('data-media-id'));
      const likesCountElement = document.querySelector(`.likes-count[data-media-id="${mediaId}"]`);
      
      if (likesCountElement) {
        try {
          const updatedMedia = await photographerService.updateLike(mediaId, 1);
          likesCountElement.textContent = updatedMedia.likes;
          event.target.classList.add('liked');
          await updateTotalLikes(photographerId);
        } catch (error) {
          console.error("Erreur lors de la mise à jour du like :", error);
        }
      }
    }
  });
}


async function updateTotalLikes(photographerId) {
  const updatedPhotographer = await photographerService.getDetailsPhotographer(photographerId);
  const totalLikesElement = document.querySelector(".container-like");
  if (totalLikesElement) {
    totalLikesElement.textContent = `${updatedPhotographer.totalLikes} ♥`;
  }
}


document.addEventListener('DOMContentLoaded', main);