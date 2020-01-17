import '../pages/index.css';
import Header from './header';
import FormPopup from './formpopup';
import SuccessPopup from './successpopup';
import Form from './form';
import Api from './api';
import '../../node_modules/sharer.js/sharer.min';
import './slider';

const popupContainer = document.querySelector('.popup');

const api = new Api({
  baseUrl:
    'https://v2-api.sheety.co/2913ff0e1453a0ecead83d09ae6c935b/bestFriends/donation',
  headers: {
    Authorization: 'Bearer praktikum2020',
  },
});

const headerFunctional = new Header(document.querySelector('.header'));
const form = new Form();
const formPopup = new FormPopup(popupContainer);
const successPopup = new SuccessPopup(popupContainer);

window.formPopup = formPopup;
window.sucessPopup = successPopup;

export default function onSuccess(e, amount, email) {
  if (e.target.closest('.popup')) {
    formPopup.close();
  }
  successPopup.open();
  // api
  //   .addDonation(amount, email)
  //   .then(res => console.log(res))
  //   .catch(res => console.log(res));
}

headerFunctional.listeners();

document.querySelectorAll('.help-button').forEach(button => {
  button.addEventListener('click', formPopup.open);
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

api
  .getSumInfo()
  .then(res => {
    const currentSum = res.donation.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    const maxSum = Number(
      document.querySelector('.form__donation-sum-max').textContent,
    );
    document.querySelector(
      '.form__donation-sum-current',
    ).textContent = currentSum.toLocaleString();
    document.querySelector(
      '.form__donation-bar-progress',
    ).style.width = `${(currentSum * 100) / maxSum}%`;
    document.querySelector(
      '.form__donation-sum-max',
    ).textContent = maxSum.toLocaleString();
  })
  .catch(() => alert('Ошибка!'));
