const song = document.getElementById('song');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');
const image = document.getElementById('image');
const nameSong = document.getElementById('name');
const authorSong = document.getElementById('author');
const durationTime = document.querySelector('.right');
const remainingTime = document.querySelector('.left');
const repeatedBtn = document.querySelector('.play_again');
const widthLine = document.querySelector('.line');
let isPlaying = true;
let indexSong = 0;


playBtn.addEventListener('click', playPause);
song.addEventListener("ended", () => {
    changeSong(1);
})

nextBtn.addEventListener('click', function() {
    changeSong(1);
});

repeatedBtn.addEventListener('click', function() {
    changeSong(0);
});

prevBtn.addEventListener('click', function() {
    changeSong(-1);
});

const images = ["image1.png", "image2.jpeg", "image3.jpg"];
const musics = ["song1.mp3", "song2.mp3", "song3.mp3"];
const names = ["Meet you at the right time (lofi version)", "Có hẹn với thanh xuân", "Đâu ai dám hứa"];
const authors = ["Avi", "Monstar", "Czee"];

function playPause() {
    if (isPlaying) {
        song.play();
        playBtn.innerHTML = '<i class="fa fa-pause-circle play-btn"></i>';
        isPlaying = false;
    } else {
        song.pause();
        playBtn.innerHTML = '<i class="fa fa-play-circle play-btn"></i>'
        isPlaying = true;
    }
}

function changeSong(x) {
    if (x === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (x === -1) {
        // previous song 
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    } else if (x === 0) {
        // repeated song
        repeatedBtn.style.color = 'white';
        isPlaying = true;
    }
    song.setAttribute("src", `./song/${musics[indexSong]}`);
    image.setAttribute("src", `./image/${images[indexSong]}`);
    nameSong.innerHTML = names[indexSong];
    authorSong.innerHTML = authors[indexSong];
    playPause();
}


function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function displayTimer() {
    const { duration, currentTime } = song;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "0:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
    widthLine.style.width = `${Math.floor(currentTime * 320 / duration)}px`;
}

displayTimer();

setInterval(displayTimer, 1000);