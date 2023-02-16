const song = document.getElementById('song');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');
const image = document.getElementById('image');
const nameSong = document.getElementById('name');
const authorSong = document.getElementById('author');
let isPlaying = true;
let indexSong = 0;

playBtn.addEventListener('click', playPause);

nextBtn.addEventListener('click', function() {
    changeSong(1);
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
    }
    song.setAttribute("src", `./song/${musics[indexSong]}`);
    image.setAttribute("src", `./image/${images[indexSong]}`);
    nameSong.innerHTML = names[indexSong];
    authorSong.innerHTML = authors[indexSong];
    playPause();
}