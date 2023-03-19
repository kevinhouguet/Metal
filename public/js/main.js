const app = {
  init() {
    console.log('init');
    app.menuBurger();
    if (window.location.pathname === '/admin/profil') {
      app.checkPassword();
    }
  },
  menuBurger() {
    const menuElem = document.querySelector('.menu');
    menuElem.addEventListener('click', app.handleMenuClick);
  },
  handleMenuClick(event) {
    const asideElem = document.querySelector('.admin-nav');
    asideElem.classList.toggle('hidden');
    const bodyElem = document.querySelector('body');
    bodyElem.classList.toggle('overflow');
  },
  checkPassword() {
    const profilSubmitFormElem = document.querySelector('form[method="PATCH"]');
    profilSubmitFormElem.removeEventListener('submit', app.handleSubmitProfilForm);
    profilSubmitFormElem.addEventListener('submit', app.handleSubmitProfilForm);
  },
  handleSubmitProfilForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const newPasswordElem = document.querySelector('form[method="PATCH"] #new-password');
    const confirmPasswordElem = document.querySelector('form[method="PATCH"] #confirm-password');
    const confirmPasswordErrorElem = document.querySelector('form[method="PATCH"] .confirm-password-error');

    if (newPasswordElem.value !== confirmPasswordElem.value) {
      confirmPasswordErrorElem.classList.remove('hidden');
    } else {
      const userObj = new FormData(form);
      confirmPasswordErrorElem.classList.add('hidden');
      app.updateProfil(userObj);
      form.reset();
    }
  },
  async updateProfil(userObj) {
    await fetch('http://localhost:3000/admin/profil', {
      method: 'PATCH',
      body: userObj,
    });
  },
};

document.addEventListener('DOMContentLoaded', app.init());
