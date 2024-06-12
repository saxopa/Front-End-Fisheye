function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

let buttonModal = document.getElementsByClassName("contact_button")[1];

buttonModal.addEventListener("click", (e) => {
  e.preventDefault();
  let nomModal = document.getElementById("champ-nom").value;
  let prenomModal = document.getElementById("champ-prenom").value;
  let mailModal = document.getElementById("champ-mail").value;
  let messageModal = document.getElementById("champ-message").value;

    let modalValues = '{"nom":"'+ nomModal + '","prenom":"'+ prenomModal + '","mail":"'+ mailModal + '","message":"'+ messageModal + '"}';
console.log(modalValues)
});
