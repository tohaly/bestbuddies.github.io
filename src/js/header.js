const shareIcon = document.querySelector('.header__sahre-icon');
const socialBarHeader = document.querySelector('.social__list_position_header');

function onSocialBar() {
  shareIcon.classList.add('header__sahre-icon_hidden');
  socialBarHeader.classList.remove('social__list_hidden');
}

function offSocialBar() {
  if(event.target.classList[0] !== 'header__sahre-icon' && event.target.classList[0] !== 'social__list'){
    shareIcon.classList.remove('header__sahre-icon_hidden');
    socialBarHeader.classList.add('social__list_hidden');
  }
}

shareIcon.addEventListener('click', (event) => {
  onSocialBar();
});

document.addEventListener('click', (event) => {
  offSocialBar();
});

document.querySelector('.estimates').addEventListener('mouseover', event => {
  console.log('ПРИВЕТТТ!');
})