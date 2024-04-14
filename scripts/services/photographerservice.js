export default class PhotographerService {
  async getPhotographers() {
    const photographers = await fetch("../../data/photographers.json");
    return photographers.json();
  }

  async getDetailsPhotographer(id) {
    const photographers = await fetch("../../data/photographers.json");
    const photographerData = await photographers.json();
    console.log(photographerData)

    // Recherche du photographe avec l'ID spécifié
    const photographer = photographerData.photographers.find(photographer => photographer.id === id);
    
    return photographer;
  }
}
