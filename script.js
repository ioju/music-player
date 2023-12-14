const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric chill machine',
        artistName: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artistName: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric chill machine',
        artistName: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Electric chill machine 2',
        artistName: 'Jacinto Design',
    },
]

//play
let isPlaying = false;
let currentSongIndex = 0;
let songDuration = 0;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadSong(song) {
    music.setAttribute('src' , `music/${song.name}.mp3`);
    image.setAttribute('src' , `img/${song.name}.jpg`);
    title.textContent = song.title;
    artist.textContent = song.artistName;
}

function getDisplayTime(time) {
    let durationMinutes = parseInt(parseInt(time) / 60);
    let durationSeconds = parseInt(parseInt(time) % 60);

    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    return `${durationMinutes}:${durationSeconds}`
}

function nextSong() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
    } else {
        currentSongIndex = 0;
    }

    resetProgressBar();
}

function prevSong() {
    if (currentSongIndex === 0) {
        currentSongIndex = songs.length - 1;
    } else {
        currentSongIndex--;
    }
    resetProgressBar();
}

function resetProgressBar() {
    progress.style.width = '0%';
}

function displayCurrentTime(currentTimeValue) {

    currentTime.textContent = getDisplayTime(currentTimeValue);
}

function setProgressValue(progressValue) {
    progress.style.width = progressValue;
}

function updateProgressBar(event) {
    const { currentTime, duration } = event.target;

    displayCurrentTime(currentTime);
    setProgressValue(parseInt(currentTime * 100 / duration) + '%');
}

function setProgressBar(event) {
    setProgressValue(parseInt(parseInt(event.offsetX) * 100 / parseInt(event.target.clientWidth)) + '%');
    const currentTimeValue = parseInt(songDuration * event.offsetX / event.target.clientWidth);

    //set audio player current time
    music.currentTime = currentTimeValue;

    //display current time
    displayCurrentTime(currentTimeValue);
}

function setDuration(event) {
    duration.textContent = getDisplayTime(event.target.duration);
    songDuration = event.target.duration;
}

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    isPlaying ? playSong() : pauseSong();
});

nextBtn.addEventListener('click', () => {
    nextSong();
    loadSong(songs[currentSongIndex]);
    pauseSong();
});

prevBtn.addEventListener('click', () => {
    prevSong();
    loadSong(songs[currentSongIndex]);
    pauseSong();
});

music.addEventListener('loadedmetadata', setDuration);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', () => {
    nextBtn.click();
    playSong();
});
progressContainer.addEventListener('click', setProgressBar);


loadSong(songs[currentSongIndex]);