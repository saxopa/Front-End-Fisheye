export default class PhotographerService {
  async getPhotographers() {
    const photographers = await fetch("../../data/photographers.json");
    return photographers.json();
  }

  async getDetailsPhotographer(id) {
    try {
      const data = await this.getPhotographers();
      let resultat = {media:[]};
      
      for (let i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === parseInt(id)) {
          resultat.details = data.photographers[i];
          break;
        }
      }
      
      for (let i = 0; i < data.media.length; i++) {
        if (data.media[i].photographerId === parseInt(id)) {
          let media = data.media[i];
          
          // Initialiser les likes dans le localStorage s'ils n'existent pas déjà
          if (!localStorage.getItem(`likes_${media.id}`)) {
            localStorage.setItem(`likes_${media.id}`, media.likes);
          }
          
          // Utiliser les likes du localStorage
          media.likes = parseInt(localStorage.getItem(`likes_${media.id}`));
          
          resultat.media.push(media);
        }
      }

      if (resultat.media.length > 0) {
        return Promise.resolve(resultat);
      } else {
        return Promise.reject(new Error("Aucun photographe trouvé avec cet ID"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  updateLikes(mediaId, increment) {
    let likes = parseInt(localStorage.getItem(`likes_${mediaId}`)) || 0;
    likes += increment ? 1 : -1;
    localStorage.setItem(`likes_${mediaId}`, likes);
    return likes;
  }
}