// Variables globales DOM
const body = document.querySelector('body');
const mainwrapper = document.querySelector('#main');
const openModalBtn = document.querySelector('.contact_button[aria-label="ouvrir le formulaire de contact"]');
const modal = document.querySelector('#contact_modal');
const modalCloseBtn = document.querySelector('#close-button');

// Fonction pour afficher la modal
function displayModal() {
  mainwrapper.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  modal.style.display = 'block';
  modalCloseBtn.focus();
}

// Fonction pour fermer la modal
function closeModal() {
  mainwrapper.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('no-scroll');
  modal.style.display = 'none';
  openModalBtn.focus();
}

// Ouvrir la modal au clic sur le bouton
openModalBtn.addEventListener('click', displayModal);

// Fermer la modal au clic sur le bouton de fermeture
modalCloseBtn.addEventListener('click', closeModal);

// Fermer la modal lorsque la touche Échap est pressée
document.addEventListener('keydown', (e) => {
  if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
    closeModal();
  }
});

// Gérer la soumission du formulaire
const formSubmitButton = document.querySelector('.contact_button[aria-label="envoyer formulaire de contact"]');
formSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nomModal = document.getElementById('champ-nom').value;
  const prenomModal = document.getElementById('champ-prenom').value;
  const mailModal = document.getElementById('champ-mail').value;
  const messageModal = document.getElementById('champ-message').value;

  const modalValues = JSON.stringify({
    nom: nomModal,
    prenom: prenomModal,
    mail: mailModal,
    message: messageModal,
  });

  console.log(modalValues);
});
