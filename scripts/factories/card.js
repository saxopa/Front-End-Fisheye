export class Cardfactory {
  async generateCard(data, name, photographerService) {
    let goodName = name.replace("-", " ");

    if (!data.video && !data.image) {
      throw "Unknown type format";
    }

    const initialLikes =
      (await photographerService.getInitialLikes(data.id)) || data.likes;

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
      <div class="container-likes" >
        <span class="likes-count" data-media-id="${data.id}">${initialLikes}</span>
        <i class="fa-solid fa-heart like-button" data-media-id="${data.id}"></i>
      </div>
    </div>
  </div>`;

    return resultat;
  }
}
