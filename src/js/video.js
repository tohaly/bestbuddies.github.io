window.onYouTubeIframeAPIReady = () => {
  window.player = new window.YT.Player('youtube-player', {
    videoId: '5tfGHKGXBiw',
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      rel: 0,
      mute: 1,
      loop: 1,
      controls: 0,
      playlist: '5tfGHKGXBiw',
    },
  });
};

export default class YoutubeApiRemote {
  constructor() {
    this.playButton = document.querySelector('.lead__button');
  }

  getUnmutedVideo() {
    const iframe = document.querySelector('.lead__iframe');
    const palceholder = document.querySelector('.lead__video');
    this.classList.add('lead__button_hidden');
    iframe.classList.add('lead__iframe_visible');
    palceholder.classList.add('lead__video_without-img');
    window.player.playVideoAt();
    window.player.unMute();
  }

  listeners() {
    this.playButton.addEventListener('click', this.getUnmutedVideo);
  }
}
