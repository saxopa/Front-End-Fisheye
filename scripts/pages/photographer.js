import PhotographerService from '../services/photographerservice.js';

// Création d'une instance de PhotographerService
const photographerService = new PhotographerService();

//Mettre le code JavaScript lié à la page photographer.html

// récupérer l'id dans l'URL de ce type photographer.html?id=243
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id)

// appeler le service et utiliser la fonction getDetailsPhotographer(id)
photographerService.getDetailsPhotographer(id)
  .then(photographer => {
    if (photographer) {
      // Faites quelque chose avec les détails du photographe
      console.log("Détails du photographe :", photographer);
    } else {
      console.log("Aucun photographe trouvé avec cet ID :", id);
    }
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors de la récupération des détails du photographe :", error);
  });

//Faire l'affichage en passant par des factory.