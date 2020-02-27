export default class Header {
  constructor(element) {
    this.element = element;
    this.shareIcon = element.querySelector('.header__sahre-icon');
    this.socialBarHeader = element.querySelector(
      '.social__list_position_header',
    );
  }

  socialBarOn() {
    this.shareIcon.classList.add('header__sahre-icon_hidden');
    this.socialBarHeader.classList.remove('social__list_hidden');
  }

  socialBarOff(event) {
    if (
      event.target.classList[0] !== 'header__sahre-icon' &&
      event.target.classList[0] !== 'social__list'
    ) {
      this.shareIcon.classList.remove('header__sahre-icon_hidden');
      this.socialBarHeader.classList.add('social__list_hidden');
    }
  }

  headerOff() {
    if (
      window.pageYOffset - 120 >
      document.querySelector('.estimates').offsetTop
    ) {
      this.element.classList.add('header_up');
    }
  }

  headerOn() {
    if (window.pageYOffset === 0) {
      this.element.classList.remove('header_up');
    }
  }

  listeners() {
    this.shareIcon.addEventListener('click', () => {
      this.socialBarOn();
    });

    document.addEventListener('click', event => {
      this.socialBarOff(event);
    });

    document.addEventListener('scroll', () => {
      this.headerOff();
      this.headerOn();
    });
  }
}
