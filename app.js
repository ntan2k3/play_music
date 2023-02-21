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
const widthLine = document.querySelector('.music-card__line');
const progressArea = document.querySelector('.music-card__play');
let isPlaying = true;
let indexSong = 0;


playBtn.addEventListener('click', playPause);
song.addEventListener("ended", () => {
    changeSong(1);
})

nextBtn.addEventListener('click', function() {
    changeSong(1);
});

// repeatedBtn.addEventListener('click', function() {
// });


prevBtn.addEventListener('click', function() {
    changeSong(-1);
});

const images = ["image1.png", "image2.jpeg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpeg", "image8.jpg", "image9.jpg", "image10.jpeg"];
const musics = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3", "song5.mp3", "song6.mp3", "song7.mp3", "song8.mp3", "song9.mp3", "song10.mp3"];
const names = ["Meet you at the right time (lofi version)", "Có hẹn với thanh xuân", "Đâu ai dám hứa", "Xuân thì", "Chạy khỏi thế giới này", "Vào hạ", "Giữa đại lộ đông tây", "Mặt mộc", "Tình yêu chậm trễ", "3107-3"];
const authors = ["Avi", "Monstar", "Czee", "Hà Anh Tuấn", "Da LAB, Phương Ly", "Suni Hạ Linh", "Uyên Linh", "Phạm Nguyên Ngọc, VAnh, Ân Nhi, BMZ", "MONSTAR", "W/N, Duong, Nau, titie"];

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
}

function progressLine() {
    let progressWidth = (song.currentTime / song.duration) * 100;
    widthLine.style.width = `${progressWidth}%`;
}

song.addEventListener("timeupdate", progressLine);

progressArea.addEventListener('click', (e) => {
    song.currentTime = (e.offsetX / progressArea.clientWidth) * song.duration;
});


displayTimer();

setInterval(displayTimer, 1000);