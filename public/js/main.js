const app = {
  init() {
    console.log('init');
    app.menuBurger();
  },
  menuBurger() {
    const menuElem = document.querySelector('.menu');
    console.log(menuElem);
    menuElem.addEventListener('click', app.handleMenuClick);
  },
  handleMenuClick(event) {
    const asideElem = document.querySelector('.admin-nav');
    asideElem.classList.toggle('hidden');
    const bodyElem = document.querySelector('body');
    bodyElem.classList.toggle('overflow');
  },
};

document.addEventListener('DOMContentLoaded', app.init());
