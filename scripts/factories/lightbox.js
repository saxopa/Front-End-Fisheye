export class Lightboxfactory {
    constructor(mediaArray, name) {
        this.mediaArray = mediaArray.media;
        this.currentMediaIndex = 0;
        this.name = name; 
    }

    showCarousel(index) {
        const modal = document.getElementById("image-carousel");
        const imgElement = document.getElementById("carousel-image");
        const videoElement = document.getElementById("carousel-video");

        const media = this.mediaArray[index];
        let goodName = this.name.replace("-", ' ');

        if (media.image) {
            imgElement.src = `assets/images/sample-photos/${goodName}/${media.image}`;
            imgElement.style.display = "block";
            videoElement.style.display = "none";
        } else if (media.video) {
            videoElement.src = `assets/images/sample-photos/${goodName}/${media.video}`;
            videoElement.style.display = "block";
            imgElement.style.display = "none";
        } else {
            throw "Unknown media format";
        }

        modal.style.display = "block";
        this.currentMediaIndex = index;
        
    }

    closeCarousel() {
        
        document.getElementById("image-carousel").style.display = "none";
    }

    showNextMedia() {
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.mediaArray.length;
        this.showCarousel(this.currentMediaIndex);
    }

    showPrevMedia() {
        this.currentMediaIndex = (this.currentMediaIndex - 1 + this.mediaArray.length) % this.mediaArray.length;
        this.showCarousel(this.currentMediaIndex);
    }
}