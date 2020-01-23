import Form from './form';
import Popup from './popup';

export default class FormPopup extends Popup {
  constructor(container) {
    super(container);
    this.popupForm = new Form();
  }

  open() {
    this.openRender();
    this.popupForm.insertToPopup();
    this.popupContent.appendChild(this.popupForm.form);
  }

  close() {
    this.popupForm.toggleEventListeners(false);
    this.closeRender();
  }
}
