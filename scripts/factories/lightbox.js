// Script pour gérer le carrousel
let currentMediaIndex = 0;
let mediaArray = [];

function showCarousel(index) {
  const modal = document.getElementById("image-carousel");
  const imgElement = document.getElementById("carousel-image");

  imgElement.src = mediaArray[index].src;
  modal.style.display = "block";
  currentMediaIndex = index;
}

function closeCarousel() {
  document.getElementById("image-carousel").style.display = "none";
}

function showNextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaArray.length;
  showCarousel(currentMediaIndex);
}

function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaArray.length) % mediaArray.length;
  showCarousel(currentMediaIndex);
}

document.querySelector(".close-carousel").onclick = closeCarousel;
document.querySelector(".next").onclick = showNextMedia;
document.querySelector(".prev").onclick = showPrevMedia;
