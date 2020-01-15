import Form from './form';

export default class Popup {
  constructor(container) {
    this.popupForm = new Form();
    this.container = container;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  addListeners() {
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close);
  }

  removeListeners(e) {
    e.target.removeEventListener('click', this.close);
  }

  open() {
    this.container.classList.add('popup_is-opened');
    this.popupForm.insertToPopup();
    this.container.appendChild(this.popupForm.form);
    this.addListeners();
  }

  close(e) {
    if (
      !e.target.nextElementSibling.classList.contains('popup__form_success')
    ) {
      this.popupForm.removeListeners();
    }
    this.removeListeners(e);
    this.container.firstElementChild.remove();
    this.container.classList.remove('popup_is-opened');
  }

  renderSuccessPopup() {
    const successPopup = document
      .querySelector('.popup-template__success')
      .content.cloneNode(true)
      .querySelector('.popup__form');
    this.container.querySelector('.popup__form').remove();
    this.container.querySelector('.popup__content').appendChild(successPopup);
    window.Sharer.init();
  }

  onSuccess(e) {
    if (e.target.closest('.popup')) window.popup.renderSuccessPopup();
    alert('Платеж прошел успешно!');
  }
}
