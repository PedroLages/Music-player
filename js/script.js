// getElementById Helper
const getId = (id) => document.getElementById(id);

const image = document.querySelector('img');
const title = getId('title');
const artist = getId('artist');
const music = document.querySelector('audio');
const progressContainer = getId('progress-container');
const progress = getId('progress');
const currentTimeEl = getId('current-time');
const durationEl = getId('duration');
const prevBtn = getId('prev');
const nextBtn = getId('next');
const playBtn = getId('play');
const durationWrapper = getId('duration-wrapper');

// Songs
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
  {
    name: 'Tea Song of the Xiang River',
    displayName: 'Tea Song of the Xiang River',
    artist: '湘江茶歌',
  },
];

let isPlaying = false;
let songId = 0;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

function nextSong() {
  songId++;
  if (songId > songs.length - 1) {
    songId = 0;
  }
  // isPlaying()
  loadSongs(songId);
  playSong();
}

function prevSong() {
  songId--;
  if (songId < 0) {
    songId = songs.length - 1;
  }
  loadSongs(songId);
  playSong();
}

// Load Audio Player
function loadSongs(song) {
  image.src = `img/${songs[song].name}.jpg`;
  music.src = `music/${songs[song].name}.mp3`;
  title.textContent = songs[song].displayName;
  artist.textContent = songs[song].artist;
}

function updateProgressBar(e) {
  const { currentTime, duration } = e.srcElement;

  if (isPlaying) {
    const progressPercentage = (currentTime / duration) * 100;
    // Update Progress Bar
    progress.style.width = `${progressPercentage}%`;

    // Calculate display for duration
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);

    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }

    // Calculate display current time
    let currentTimeMin = Math.floor(currentTime / 60);
    let currentTimeSec = Math.floor(currentTime % 60);

    if (currentTimeSec < 10) {
      currentTimeSec = `0${currentTimeSec}`;
    }

    if (currentTimeMin < 10) {
      currentTimeMin = `0${currentTimeMin}`;
    }

    // Delay switching duration element to avoid Nan
    if (durationSec) {
      durationEl.textContent = `0${durationMin}:${durationSec}`;
    } else {
      durationEl.textContent = 'loading';
    }
    currentTimeEl.textContent = `${currentTimeMin}:${currentTimeSec}`;
  }
}

// Change the progress bar state
function progressAudioBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', progressAudioBar);

// Press Spacebar to start/stop music
document.body.onkeyup = (e) => {
  if (e.keyCode == 32) {
    isPlaying ? pauseSong() : playSong();
  }
};
