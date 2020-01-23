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
      .querySelector('.popup__form');
    this.checkedRadio = this.form.querySelector('input[name=sum]:checked');
  }

  insertToPage() {
    this.render();
    this.form.firstElementChild.remove();
    this.form.classList.add('popup__form_position_page');
    document
      .querySelector('.form')
      .insertBefore(this.form, document.querySelector('.form__donation-bar'));
    this.toggleEventListeners(true);
  }

  insertToPopup() {
    this.render();
    this.toggleEventListeners(true);
  }

  toggleEventListeners(isAdd) {
    const submitWrapper = this.form.querySelector('.popup__submit-wrapper');
    const sumButCustom = this.form.querySelector('.popup__sum-button_custom');

    if (isAdd) {
      this.form.addEventListener('input', this.validation.validateHandler);
      submitWrapper.addEventListener('click', this.submit);
      sumButCustom.addEventListener('input', this.uncheckRadio);
    } else {
      this.form.removeEventListener('input', this.validation.validateHandler);
      submitWrapper.removeEventListener('click', this.submit);
      sumButCustom.removeEventListener('input', this.uncheckRadio);
    }
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
        const data = {
          cloudPayments: {
            recurrent: {
              interval: 'Month',
              period: 1,
            },
          },
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
    const customSunValue = e.target.form.elements.customSum.value;
    if (customSunValue) {
      return customSunValue;
    }
    if (this.form.querySelector('input[name=sum]:checked')) {
      return this.form.querySelector('input[name=sum]:checked').value;
    }
  }
}
