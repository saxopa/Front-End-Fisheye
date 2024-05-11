export class Cardfactory {
    generateCard(data, name) {
      if (data.image) {
        return `
          <div class="card"> 
            <img class="card-img-top" src="assets/images/sample photos/${name}/${data.image}"" />
            <div>
              <h2>${data.title}</h2> 
              <div>
                <span>${data.likes}</span>
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>`;
      } else if (data.video) {
        return `    
          <div> 
            <video class="card-video" controls>
              <source src="assets/images/sample photos/${name}/${data.video}" type="video/mp4" />
            </video>
            <div>
              <h2>${data.title}</h2> 
              <div>
                <span>${data.likes}</span>
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>`;
      } else {
        throw "Unknown type format";
      }
    }
  }
  