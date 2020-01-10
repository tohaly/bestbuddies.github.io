import Validation from './validation';

export default class Popup {
  constructor(container) {
    this.validation = new Validation();
    this.container = container;
    this.popupDonate = document.querySelector('.popup__content_form');
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.uncheckRadio = this.uncheckRadio.bind(this);
    this.submit = this.submit.bind(this);
  }

  addListeners() {
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close);
    this.container.addEventListener('input', this.validation.validateHandler);
    this.container.querySelectorAll('.popup__submit').forEach(button => {
      button.addEventListener('click', this.submit);
    });
    this.container
      .querySelector('.popup__sum-button_custom')
      .addEventListener('click', this.uncheckRadio);
  }

  removeListeners(e) {
    e.target.removeEventListener('click', this.close);
    if (
      e.target
        .closest('.popup__content')
        .classList.contains('popup__content_form')
    ) {
      this.container.removeEventListener(
        'input',
        this.validation.validateHandler,
      );
      this.container.querySelectorAll('.popup__submit').forEach(button => {
        button.removeEventListener('click', this.validation.validateHandler);
      });
      this.container
        .querySelector('.popup__sum-button_custom')
        .removeEventListener('click', this.uncheckRadio);
    }
  }

  uncheckRadio() {
    this.container.querySelectorAll('.popup__sum-radio').forEach(radio => {
      radio.checked = false;
    });
  }

  open() {
    this.container.classList.add('popup_is-opened');
    this.popupDonate.classList.add('popup__content_is-opened');
    this.addListeners();
  }

  close(e) {
    this.removeListeners(e);
    e.target
      .closest('.popup__content')
      .classList.remove('popup__content_is-opened');
    this.container.classList.remove('popup_is-opened');
  }

  submit(e) {
    e.preventDefault();

    if (
      e.target.classList.contains('popup__submit_color_white_active') ||
      e.target.classList.contains('popup__submit_color_purple_active')
    ) {
      const formPopup = document
        .querySelector('.popup-template__success')
        .content.cloneNode(true)
        .querySelector('.popup__content');
      this.removeListeners(e);
      this.container.firstElementChild.remove();
      this.container.appendChild(formPopup);
      this.container
        .querySelector('.popup__close')
        .addEventListener('click', this.close);
    } else {
      this.validation.validateHandler(e);
    }
  }
}
