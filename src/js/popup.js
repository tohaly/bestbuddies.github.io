export default class Popup {
  constructor(container) {
    this.container = container;
    this.popupContent = this.container.querySelector('.popup__content');
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  addListeners() {
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close);
  }

  removeListeners() {
    this.container
      .querySelector('.popup__close')
      .removeEventListener('click', this.close);
  }

  openRender() {
    this.container.classList.add('popup_is-opened');
    this.addListeners();
  }

  closeRender() {
    this.container.querySelector('.popup__form').remove();
    this.removeListeners();
    this.container.classList.remove('popup_is-opened');
  }

  // onSuccess(e) {
  //   if (e.target.closest('.popup')) {
  //     window.formPopup.close();
  //   }
  //   window.successPopup.open();
  // }

  // open() {
  //   this.render();
  //   this.popupForm.insertToPopup();
  //   this.container.appendChild(this.popupForm.form);
  // }

  // close(e) {
  //   // if (
  //   //   !e.target.nextElementSibling.classList.contains('popup__form_success')
  //   // ) {
  //   //   this.popupForm.removeListeners();
  //   // }
  //   this.removeListeners(e);
  //   this.closeRender();
  //   this.container.classList.remove('popup_is-opened');
  // }

  // renderSuccessPopup() {
  //   if (this.container.classList.contains('popup_is-opened')) {
  //     this.container.querySelector('.popup__form').remove();
  //   } else {
  //     this.container.classList.add('popup_is-opened');
  //   }

  //   const successPopup = document
  //     .querySelector('.popup-template__success')
  //     .content.cloneNode(true)
  //     .querySelector('.popup__form');
  //   this.container.querySelector('.popup__content').appendChild(successPopup);
  //   window.Sharer.init();
  // }
}
