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
    'https://v2-api.sheety.co/2913ff0e1453a0ecead83d09ae6c935b/bestFriends/donations',
  headers: {
    Authorization: 'Bearer praktikum2020',
    'Content-Type': 'application/json',
  },
});

const headerFunctional = new Header(document.querySelector('.header'));
const form = new Form();
const formPopup = new FormPopup(popupContainer);
const successPopup = new SuccessPopup(popupContainer);

window.formPopup = formPopup;
window.sucessPopup = successPopup;

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

function apiGetSum() {
  api
    .getSumInfo()
    .then(res => {
      const currentSum = res.donations.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
      const progressBar = document.querySelector(
        '.form__donation-bar-progress',
      );
      const currentSumDOM = document.querySelector(
        '.form__donation-sum-current',
      );
      const maxSumDOM = document.querySelector('.form__donation-sum-max');
      const maxSum = 764536;
      if (currentSum <= maxSum) {
        progressBar.style.width = `${(currentSum * 100) / maxSum}%`;
        currentSumDOM.textContent = currentSum.toLocaleString();
      } else {
        progressBar.style.width = `100%`;
        currentSumDOM.textContent = maxSum.toLocaleString();
      }
      maxSumDOM.textContent = maxSum.toLocaleString();
    })
    .catch(res => alert(res));
}

export default function onSuccess(e, amount, email) {
  if (e.target.closest('.popup')) {
    formPopup.close();
  }
  successPopup.open();
  api
    .addDonation(amount, email)
    .then(() => apiGetSum())
    .catch(err => console.log(err));
}

form.insertToPage();
apiGetSum();
