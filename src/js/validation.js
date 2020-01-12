export default class Validation {
  constructor() {
    this.validateHandler = this.validateHandler.bind(this);
  }

  inputHandler(field) {
    if (field.validity.valueMissing) {
      field.nextElementSibling.textContent = 'Пожалуйста, заполните поле';
      this.toggleFieldByValid(field, true);
    } else if (field.validity.patternMismatch) {
      field.nextElementSibling.textContent =
        'Адрес почты указан в неверном формате';
      this.toggleFieldByValid(field, true);
    } else {
      this.toggleFieldByValid(field, false);
    }
  }

  toggleFieldByValid(field, state) {
    if (state) {
      field.classList.add('popup__input_invalid');
      field.previousElementSibling.style.color = 'red';
    } else {
      field.nextElementSibling.textContent = '';
      field.classList.remove('popup__input_invalid');
      field.previousElementSibling.style.color = '#5a3f98';
    }
  }

  checkFormValid(form) {
    if (form.checkValidity()) return true;
    return false;
  }

  validateHandler(event) {
    const form = event.target.closest('.popup__form');
    const submitWhite = form.querySelector('.popup__submit_color_white');
    const submitPurple = form.querySelector('.popup__submit_color_purple');
    const nameInput = form.querySelector('.popup__input_name');
    const emailInput = form.querySelector('.popup__input_email');

    event.preventDefault();

    if (event.target.name === 'username') {
      this.inputHandler(nameInput);
    } else if (event.target.name === 'email') {
      this.inputHandler(emailInput);
    } else if (event.target.classList.contains('popup__submit')) {
      this.inputHandler(nameInput);
      this.inputHandler(emailInput);
    }

    if (this.checkFormValid(form)) {
      submitWhite.classList.add('popup__submit_color_white_active');
      submitPurple.classList.add('popup__submit_color_purple_active');
    } else {
      submitWhite.classList.remove('popup__submit_color_white_active');
      submitPurple.classList.remove('popup__submit_color_purple_active');
    }
  }
}
