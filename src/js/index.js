import '../pages/index.css';
import './slider';
import {Header} from './header';

const headerFunctional = new Header(document.querySelector('.header'));

headerFunctional.listeners();

document.querySelector('.up-button').addEventListener('click', event => {
  event.preventDefault();
  const timeOut = setInterval(() => {
          window.scrollBy(0,-100);          
        },10);
  document.addEventListener('scroll', () => {
    if(pageYOffset === 0){          
      clearInterval(timeOut);
    }
  })  
})