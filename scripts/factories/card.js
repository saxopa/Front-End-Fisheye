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
      <div >
        <span>${data.likes}</span>
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </div>`;
    return resultat;
  }
}
