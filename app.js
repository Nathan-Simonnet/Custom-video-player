
const video = document.getElementById('myVideo');

// Play pause
// =================================================

function playOrPauseLogoDisplay(playing, logo1, logo2) {
    if (playing) {
        logo1.classList.remove('hidden');
        logo2.classList.add('hidden');
    } else {
        logo1.classList.add('hidden');
        logo2.classList.remove('hidden');
    };
};

const playPauseBtn = document.getElementById('playPauseBtn');
const playLogo = document.getElementById('playLogo');
const pauseLogo = document.getElementById('pauseLogo');

video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playOrPauseLogoDisplay(false, playLogo, pauseLogo);
    } else {
        video.pause();
        playOrPauseLogoDisplay('playing', playLogo, pauseLogo);
    };
});

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playOrPauseLogoDisplay(false, playLogo, pauseLogo);
    } else {
        video.pause();
        playOrPauseLogoDisplay('playing', playLogo, pauseLogo);
    };
});

// Mute
// =================================================

const muteBtn = document.getElementById('muteBtn');
const muteLogo = document.getElementById('muteLogo');
const unMuteLogo = document.getElementById('unMuteLogo');

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    video.muted ? playOrPauseLogoDisplay('playing', muteLogo, unMuteLogo) : playOrPauseLogoDisplay(false, muteLogo, unMuteLogo);
});

// Volume control
// =================================================

const volumeControl = document.getElementById('volumeControl');

volumeControl.addEventListener('input', () => {
    if (video.muted) {
        playOrPauseLogoDisplay(false, muteLogo, unMuteLogo);
        video.muted = !video.muted;
    };
    video.volume = volumeControl.value;
});

// Full screen
// =================================================

const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoContainer = document.querySelector('.custom-video-player');

const deFullScreenLogo = document.getElementById('deFullScreenLogo');
const fullScreenLogo = document.getElementById('fullScreenLogo');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        // if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
        playOrPauseLogoDisplay(false, fullScreenLogo, deFullScreenLogo);
        // } else if (videoContainer.webkitRequestFullscreen) { // Safari
        //     videoContainer.webkitRequestFullscreen();
        // } else if (videoContainer.msRequestFullscreen) { // IE11
        //     videoContainer.msRequestFullscreen();
        // }
        // fullscreenBtn.textContent = 'Exit Fullscreen';
    } else {
        // if (document.exitFullscreen) {
        document.exitFullscreen();
        playOrPauseLogoDisplay('fullscreen', fullScreenLogo, deFullScreenLogo);
        // } else if (document.webkitExitFullscreen) { // Safari
        // document.webkitExitFullscreen();
        // } else if (document.msExitFullscreen) { // IE11
        // document.msExitFullscreen();
        // }
        // fullscreenBtn.textContent = 'Fullscreen';
    }
});

// Well well weeeeeeell
// ================================================

// progressBarInput.value = (video.currentTime / video.duration) * 100; ?

const progressBarInput = document.getElementById('progressBarInput');
const progressBar = document.getElementById('progressBar');

window.addEventListener('load', () => {

    console.log(video.duration);
    progressBarInput.min = 0;
    progressBarInput.max = Math.floor(video.duration);

    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
        progressBarInput.value = Math.floor(video.currentTime);
        progressBar.style.width = `${(Math.floor((video.currentTime * 100) ) / video.duration)}%`
    });

    // Update progress bar as video plays
    progressBarInput.addEventListener('input', (e) => {
        console.log(progressBarInput.value, video.currentTime)
        video.currentTime = progressBarInput.value;
        progressBar.style.width = `${(Math.floor((progressBarInput.value * 100)) / video.duration)}%`
    });
});
