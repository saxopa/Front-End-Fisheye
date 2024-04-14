import PhotographerService from "../services/photographerservice.js";

let photographerService = new PhotographerService();

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // Crée le template
    const photographerModel = photographerTemplate(photographer);
    // Crée le userCardDOM
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajoute le userCardDOM à la section photographers
    photographersSection.appendChild(userCardDOM);
    console.log(photographer)
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await photographerService.getPhotographers();
  displayData(photographers);
}

init();


