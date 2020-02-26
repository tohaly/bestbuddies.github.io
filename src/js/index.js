import '../pages/index.css';
import Header from './header';
import FormPopup from './formpopup';
import SuccessPopup from './successpopup';
import Form from './form';
import Api from './api';
import '../../node_modules/sharer.js/sharer.min';
import './slider';
import config from './config';
import './video';

const popupContainer = document.querySelector('.popup');

const { TOKEN, SERVER_URL, PUBLIC_ID, MAX_SUM } = config;

const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    Authorization: TOKEN,
    'Content-Type': 'application/json',
  },
});

const headerFunctional = new Header(document.querySelector('.header'));
const form = new Form();
const formPopup = new FormPopup(popupContainer);
const successPopup = new SuccessPopup(popupContainer);

window.formPopup = formPopup;
window.sucessPopup = successPopup;

function apiGetSum() {
  api
    .getSumInfo()
    .then(res => {
      const progressBar = document.querySelector(
        '.form__donation-bar-progress',
      );
      const currentSumDOM = document.querySelector(
        '.form__donation-sum-current',
      );
      const currentSum = res.donations.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

      if (currentSum <= MAX_SUM) {
        progressBar.style.width = `${(currentSum * 100) / MAX_SUM}%`;
        currentSumDOM.textContent = currentSum.toLocaleString();
      } else {
        progressBar.style.width = `100%`;
        currentSumDOM.textContent = MAX_SUM.toLocaleString();
      }
    })
    .catch(res => alert(res));
}

function onSuccess(e, amount, email) {
  if (e.target.closest('.popup')) {
    formPopup.close();
  }
  successPopup.open();
  api
    .addDonation(amount, email)
    .then(() => apiGetSum())
    .catch(err => console.log(err));
}

export { PUBLIC_ID, onSuccess };

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
    dummy.value = 'https://sport.bestbuddies.ru/';
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  });
});

document.querySelector(
  '.form__donation-sum-max',
).textContent = MAX_SUM.toLocaleString();
form.insertToPage();
apiGetSum();
