const app = {
  init() {
    console.log('init');
    app.menuBurger();
    if (window.location.pathname === '/admin/profil') {
      app.checkPassword();
    }
    if (window.location.pathname === '/admin/updateItem') {
      app.updateItemLayout();
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
  updateItemLayout() {
    const itemSelectElem = document.querySelector('#itemId');

    // OnChange event on select item changes
    itemSelectElem.addEventListener('change', (event) => {
      // Selection of all options to retrieve metal id, name and price
      const optionsItemElem = event.currentTarget.querySelectorAll('option');
      let metalId = 0;
      optionsItemElem.forEach((itemElem) => {
        if (itemElem.value === event.currentTarget.value) {
          // retrieve and change dynamically the name of item
          const nameItemElem = document.querySelector('#name');
          nameItemElem.value = itemElem.textContent;

          // retrieve and change dynamically the price of item
          const priceItemElem = document.querySelector('#price');
          priceItemElem.value = itemElem.dataset.price;

          // retrieve and return the metalId
          metalId = itemElem.dataset.metalId;
        }
      });
      const metalSelectElem = document.querySelector('#metalId');
      // selection of all options about metal Selection to change select metal dynamycally
      const optionsMetalElem = metalSelectElem.querySelectorAll('option');
      optionsMetalElem.forEach((metalElem) => {
        if (metalElem.value === metalId) {
          metalElem.selected = true;
        }
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', app.init());
