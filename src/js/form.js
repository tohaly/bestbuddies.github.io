import Validation from './validation';
import pay from './payment';

export default class Form {
  constructor() {
    this.pay = pay;
    this.validation = new Validation();
    this.form = null;
    this.checkedRadio = null;
    this.uncheckRadio = this.uncheckRadio.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    this.form = document
      .querySelector('.popup-template__form')
      .content.cloneNode(true)
      .querySelector('.popup__content_form');
    this.checkedRadio = this.form.querySelector('input[name=sum]:checked');
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
    this.form
      .querySelector('.popup__submit-wrapper')
      .addEventListener('click', this.submit);
    this.form
      .querySelector('.popup__sum-button_custom')
      .addEventListener('input', this.uncheckRadio);
  }

  removeListeners() {
    this.form.removeEventListener('input', this.validation.validateHandler);
    this.form
      .querySelector('.popup__submit-wrapper')
      .removeEventListener('click', this.submit);
    this.form
      .querySelector('.popup__sum-button_custom')
      .removeEventListener('input', this.uncheckRadio);
  }

  submit(e) {
    e.preventDefault();

    if (
      e.target.classList.contains('popup__submit') &&
      e.target.closest('.popup__form').checkValidity()
    ) {
      const amount = Number(this.getSum(e));
      const email = e.target.form.elements.email.value;
      if (e.target.classList.contains('popup__submit_color_purple')) {
        const data = {};
        data.cloudPayments = {
          recurrent: { interval: 'Month', period: 1 },
        };
        this.pay(amount, email, e, data);
      } else {
        this.pay(amount, email, e);
      }
    } else {
      this.validation.validateHandler(e);
    }
  }

  uncheckRadio(e) {
    if (this.form.querySelector('input[name=sum]:checked')) {
      this.form.querySelector('input[name=sum]:checked').checked = false;
    }
    if (e.target.value === '') {
      this.checkedRadio.checked = true;
    }
  }

  getSum(e) {
    if (e.target.form.elements.customSum.value) {
      return e.target.form.elements.customSum.value;
    }
    if (this.form.querySelector('input[name=sum]:checked')) {
      return this.form.querySelector('input[name=sum]:checked').value;
    }
  }
}
