export class Cardfactory {
  generateCard(data, name) {
    let goodName = name.replace("-", ' ');

    if(!data.video && !data.image ){
      throw "Unknown type format";
    }

    let resultat = `<div class="card">`;
    if (data.image) {
      resultat += `
            <img class="card-img-top" src="assets/images/sample-photos/${goodName}/${data.image}" />
           `;
    } else {
      resultat += `    
            <video class="card-video" controls>
              <source src="assets/images/sample-photos/${goodName}/${data.video}" type="video/mp4" />
            </video>
          `;
    }  
    resultat += `<div class="card-div-bottom">
      <h2>${data.title}</h2> 
      <div class="container-likes" data-media-id="${data.id}">
        <span class="likes-count">${data.likes}</span>
        <i class="fa-solid fa-heart like-button"></i>
      </div>
    </div>
  </div>`;
    return resultat;
  }

  attachLikeEvents(photographerService) {
    document.querySelectorAll('.like-button').forEach(button => {
      button.addEventListener('click', function() {
        const container = this.closest('.container-likes');
        const mediaId = container.dataset.mediaId;
        const likesCountElement = container.querySelector('.likes-count');
        
        const isLiked = this.classList.contains('liked');
        const newLikes = photographerService.updateLikes(mediaId, !isLiked);
        
        likesCountElement.textContent = newLikes;
        this.classList.toggle('liked');
      });
    });
  }
}