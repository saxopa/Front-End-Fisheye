 export class Cardfactory {
  generateCard(data) {
    if (data.image) {
      return `
          <div> 
          <img src="${data.image}" />
          <div>
            <h2>${data.title}</h2> 

            <div>
            <span>${data.likes}</span>
            <i class="fa-solid fa-heart"></i>
            </div>

          </div>
          `;
      // Sinon retourne-moi le nouveau formatage
    } else if (data.video) {
      return `    
          <div> 
          <video controls>
  <source src="${data.video}" type="video/mp4" />
</video>
          <div>
            <h2>${data.title}</h2> 
            
            <div>
                <span>${data.likes}</span>
                <i class="fa-solid fa-heart"></i>
            </div>

          </div>`;
      // Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
    } else {
      throw "Unknown type format";
    }
  }
}

