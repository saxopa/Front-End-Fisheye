export default class PhotographerService {
  async getPhotographers() {
    const photographers = await fetch("../../data/photographers.json");
    return photographers.json();
  }

  async getDetailsPhotographer(id) {
    try {
      // Récupérer les données des photographes
      const data = await this.getPhotographers();
      let resultat = { media: [], totalLikes: 0 };
      
      // Recherche dans la liste des photographes
      for (let i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === parseInt(id)) {
          resultat.details = data.photographers[i]; // Renvoie les détails du photographe
          break;
        }
      }
      
      // Récupérer les médias et calculer la somme des likes
      for (let i = 0; i < data.media.length; i++) {
        if (data.media[i].photographerId === parseInt(id)) {
          // Ajoute les éléments au tableau média
          resultat.media.push(data.media[i]);
          
          // Récupérer les likes du localStorage ou utiliser la valeur par défaut
          const storedLikes = JSON.parse(localStorage.getItem('mediaLikes')) || {};
          const currentLikes = storedLikes[data.media[i].id] || data.media[i].likes;
          
          // Ajouter les likes au total
          resultat.totalLikes += currentLikes;
        }
      }
  
      if (resultat.media.length > 0) {
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
  
  async updateLike(mediaId, increment) {
    try {
      const data = await this.getPhotographers();
      const mediaIndex = data.media.findIndex(m => m.id === mediaId);
      
      if (mediaIndex !== -1) {
        // Récupérer les likes du localStorage ou utiliser la valeur par défaut
        const storedLikes = JSON.parse(localStorage.getItem('mediaLikes')) || {};
        const currentLikes = storedLikes[mediaId] || data.media[mediaIndex].likes;
        
        let updatedLikes = 0;


        if(data.media[mediaIndex].likes == currentLikes ){
          // Mettre à jour le nombre de likes
         updatedLikes = currentLikes + increment;
      
         
        
        // Sauvegarder dans le localStorage
        storedLikes[mediaId] = updatedLikes;
        localStorage.setItem('mediaLikes', JSON.stringify(storedLikes));
        
        }
        else{
           updatedLikes = currentLikes
        }
        // Mettre à jour l'objet media
        const updatedMedia = {...data.media[mediaIndex], likes: updatedLikes};
        return updatedMedia;
      } else {
        throw new Error("Media non trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du like :", error);
      throw error;
    }
  }
  
  async getInitialLikes(mediaId) {
    const storedLikes = JSON.parse(localStorage.getItem('mediaLikes')) || {};
    return storedLikes[mediaId] || null;
  }

  async sortMedia(media, sortBy) {
    switch (sortBy) {
      case 'likes':
        return media.sort((a, b) => b.likes - a.likes);
      case 'date':
        return media.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'title':
        return media.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return media;
    }
  }

  async getDetailsPhotographerWithSort(id, sortBy = 'likes') {
    try {
      console.log(id)
      const result = await this.getDetailsPhotographer(id);
      result.media = await this.sortMedia(result.media, sortBy);
      
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération et du tri des détails du photographe :", error);
      throw error;
    }
  }
}