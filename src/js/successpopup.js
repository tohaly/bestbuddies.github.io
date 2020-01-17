import Popup from './popup';

export default class SuccessPopup extends Popup {
  constructor(container) {
    super(container);
  }

  open() {
    this.openRender();
    const successPopup = document
      .querySelector('.popup-template__success')
      .content.cloneNode(true)
      .querySelector('.popup__form');
    this.popupContent.appendChild(successPopup);
    window.Sharer.init();
  }

  close(e) {
    this.closeRender();
  }
}
