import '../pages/index.css';
import './slider';
import Header from './header';
import Popup from './popup';
import Form from './form';

const popupContainer = document.querySelector('.popup');

const headerFunctional = new Header(document.querySelector('.header'));
const popup = new Popup(popupContainer);
const form = new Form();
window.popup = popup;

headerFunctional.listeners();

document.querySelectorAll('.help-button').forEach(button => {
  button.addEventListener('click', popup.open)
});

document.querySelector('.up-button').addEventListener('click', event => {
  event.preventDefault();
  const timeOut = setInterval(() => {
    window.scrollBy(0, -100);
  }, 10);
  document.addEventListener('scroll', () => {
    if (pageYOffset === 0) {
      clearInterval(timeOut);
    }
  });
});

document.querySelectorAll('.social__item_copy').forEach(button => {
  button.addEventListener('click', e => {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = 'https://bestbuddies.ru/';
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  });
});

form.insertToPage();
