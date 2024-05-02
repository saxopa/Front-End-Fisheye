export default class PhotographerService {
  async getPhotographers() {
    const photographers = await fetch("../../data/photographers.json");
    return photographers.json();
  }

  async getDetailsPhotographer(id) {
    try {
      // Récupérer les données des photographes
      const data = await this.getPhotographers();
      let resultat = {media:[]};
      // Recherche dans la liste des photographes
      for (let i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === parseInt(id)) {
          resultat.details = data.photographers[i]; // Renvoie les détails du photographe
          break;
        }
      }
      for (let i = 0; i < data.media.length; i++) {
        if (data.media[i].photographerId === parseInt(id)) {
          //Ajoute les élements au tableau média
          resultat.media.push(data.media[i]); // Renvoie les détails du photographe
        }
      }

      if (resultat != {media:[]}) {
        return Promise.resolve(resultat);
      } else {
        // Si aucun photographe avec cet identifiant n'est trouvé, renvoie une promesse rejetée
        return Promise.reject(
          new Error("Aucun photographe trouvé avec cet ID")
        );
      }
    } catch (error) {
      // Gérer les erreurs de récupération des données des photographes
      return Promise.reject(error);
    }
  }
}
