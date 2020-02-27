export default class YoutubeApiRemote {
  constructor() {
    this.playButton = document.querySelector('.lead__button');
    this.fixBugWithLoad();
    this.counter = 0;
    this.isRepeat = false;
    this.youtubeIfreameApi();
    this.switchingButton = this.switchingButton.bind(this);
    this.listeners = this.listeners.bind(this);
  }

  youtubeIfreameApi() {
    // eslint-disable-next-line no-return-assign
    return (window.onYouTubeIframeAPIReady = () => {
      window.player = new window.YT.Player('youtube-player', {
        videoId: '5tfGHKGXBiw',
        playerVars: {
          autoplay: 1,
          showinfo: 0,
          rel: 0,
          mute: 1,
          loop: 1,
          controls: 0,
          disablekb: 1,
          playlist: '5tfGHKGXBiw',
          origin: window.location.href,
        },
        events: {
          onReady: () => {
            this.listeners();
          },
          onStateChange: event => {
            this.switchingButton(event);
          },
        },
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getUnmutedVideo() {
    window.player.isButtonRun = true;
    const iframe = document.querySelector('.lead__iframe');
    const palceholder = document.querySelector('.lead__video');
    iframe.classList.add('lead__iframe_visible');
    palceholder.classList.add('lead__video_without-img');
    window.player.playVideoAt();
    window.player.unMute();
    window.player.playVideo();
  }

  switchingButton(event) {
    // eslint-disable-next-line default-case
    switch (event.data) {
      case 1: {
        if ((this.counter > 1 && this.isRepeat) || window.player.isButtonRun) {
          this.playButton.classList.add('lead__button_hidden');
        }
        this.counter += 1;
        break;
      }
      case 2: {
        this.playButton.classList.remove('lead__button_hidden');
        return;
      }
      case 0: {
        if (this.counter >= 1) {
          this.counter += 1;
          this.playButton.classList.add('lead__button_hidden');
        }
        break;
      }
      case -1: {
        this.counter = 0;
        this.playButton.classList.remove('lead__button_hidden');
        break;
      }
      case 3: {
        this.counter += 1;
        this.isRepeat = true;
        break;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  fixBugWithLoad() {
    return setTimeout(() => {
      if (!window.player) {
        window.onYouTubeIframeAPIReady();
      }
    }, 1000);
  }

  listeners() {
    this.playButton.addEventListener('click', this.getUnmutedVideo);
  }
}
