import '../pages/index.css';
import Popup from './popup';

const popupContainer = document.querySelector('.popup');

const popup = new Popup(popupContainer);

document.querySelectorAll('.help-button').forEach(button => {
  button.addEventListener('click', popup.open);
});
