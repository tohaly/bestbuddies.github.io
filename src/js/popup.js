export default class Popup {
  constructor(container) {
    this.container = container;
    this.popupContent = this.container.querySelector('.popup__content');
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  toggleEventListeners(isAdd) {
    const closeButton = this.container.querySelector('.popup__close');
    if (isAdd) {
      closeButton.addEventListener('click', this.close);
    } else {
      closeButton.removeEventListener('click', this.close);
    }
  }

  openRender() {
    this.container.classList.add('popup_is-opened');
    this.toggleEventListeners(true);
  }

  closeRender() {
    this.container.querySelector('.popup__form').remove();
    this.toggleEventListeners(false);
    this.container.classList.remove('popup_is-opened');
  }
}
