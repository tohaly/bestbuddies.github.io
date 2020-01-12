import Validation from './validation';

export default class Form {
  constructor() {
    this.validation = new Validation();
    this.form = '';
    this.uncheckRadio = this.uncheckRadio.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    this.form = document
      .querySelector('.popup-template__form')
      .content.cloneNode(true)
      .querySelector('.popup__content_form');
  }

  insertToPage() {
    this.render();
    this.form = this.form.querySelector('.popup__form');
    this.form.firstElementChild.remove();
    this.form.classList.add('popup__form_position_page');
    document
      .querySelector('.form')
      .insertBefore(this.form, document.querySelector('.form__donation-bar'));
    this.addListeners();
  }

  insertToPopup() {
    this.render();
    this.addListeners();
  }

  addListeners() {
    this.form.addEventListener('input', this.validation.validateHandler);
    this.form.querySelectorAll('.popup__submit').forEach(button => {
      button.addEventListener('click', this.submit);
    });
    this.form
      .querySelector('.popup__sum-button_custom')
      .addEventListener('click', this.uncheckRadio);
  }

  removeListeners() {
    this.form.removeEventListener('input', this.validation.validateHandler);
    this.form.querySelectorAll('.popup__submit').forEach(button => {
      button.removeEventListener('click', this.submit);
    });
    this.form
      .querySelector('.popup__sum-button_custom')
      .removeEventListener('click', this.uncheckRadio);
  }

  submit(e) {
    e.preventDefault();

    if (e.target.closest('.popup__form').checkValidity()) {
      if (e.target.closest('.popup')) {
        this.removeListeners();
        window.popup.renderSuccessPopup();
      } else {
        console.log('open payment');
      }
    } else {
      this.validation.validateHandler(e);
    }
  }

  uncheckRadio() {
    this.form.querySelectorAll('.popup__sum-radio').forEach(radio => {
      radio.checked = false;
    });
  }
}
