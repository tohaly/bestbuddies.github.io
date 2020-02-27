import { tns } from '../../node_modules/tiny-slider/src/tiny-slider';

const slider = tns({
  container: '.slider-items',
  autoplay: false,
  controls: false,
  navContainer: '.slider-remote__navigation',
  swipeAngle: '45',
  mouseDrag: true,
});

document
  .querySelector('.slider-remote__arrow_left')
  .addEventListener('click', () => {
    slider.goTo('prev');
  });
document
  .querySelector('.slider-remote__arrow_right')
  .addEventListener('click', () => {
    slider.goTo('next');
  });
