let player;
// eslint-disable-next-line func-names
window.onYouTubePlayerAPIReady = function() {
  // eslint-disable-next-line no-undef
  player = new YT.Player('youtube-player', {
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      rel: 0,
      mute: 1,
      loop: 1,
      controls: 0,
      playlist: '5tfGHKGXBiw',
    },
    videoId: '5tfGHKGXBiw',
  });
};

const buttonControl = () => {
  const playYbutt = document.querySelector('.lead__button');
  const iframe = document.querySelector('.lead__iframe');
  const palceholder = document.querySelector('.lead__video');
  playYbutt.classList.add('lead__button_hidden');
  iframe.classList.add('lead__iframe_visible');
  palceholder.classList.add('lead__video_without-img');
  player.playVideoAt();
  player.unMute();
};

document
  .querySelector('.lead__button')
  .addEventListener('click', buttonControl);
