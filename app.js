
// Timer!!

const video = document.getElementById('myVideo');

function logosToggler(logo1, logo2) {
    logo1.classList.toggle('hidden');
    logo2.classList.toggle('hidden');
};

// Play pause
// =================================================
let clickTimeout;
let clickIndex = 0
const playPauseBtn = document.getElementById('playPauseBtn');
const playLogo = document.getElementById('playLogo');
const pauseLogo = document.getElementById('pauseLogo');

function videoPauseOrPlayHandler() {
    if (video.paused) {
        video.play();
        logosToggler(playLogo, pauseLogo);
    } else {
        video.pause();
        logosToggler(playLogo, pauseLogo);
    };
}
// video.addEventListener('click', videoPauseOrPlayHandler);
video.addEventListener('click', () => {
    clickIndex++;
    if (clickIndex === 1) {
        clickTimeout = setTimeout(() => {
            videoPauseOrPlayHandler();
            clickIndex = 0;
        }, 200);
    }
});
playPauseBtn.addEventListener('click', videoPauseOrPlayHandler);

// Mute
// =================================================
let currentVolumeEqualZero = false;
const muteBtn = document.getElementById('muteBtn');
const muteLogo = document.getElementById('muteLogo');
const unMuteLogo = document.getElementById('unMuteLogo');

muteBtn.addEventListener('click', () => {
    if (!currentVolumeEqualZero) {
        video.muted = !video.muted;
        logosToggler(muteLogo, unMuteLogo);
    }
});

// Volume control
// =================================================

const volumeControl = document.getElementById('volumeControl');
volumeControl.addEventListener('input', () => {
    // Prevent from who knows
    if (volumeControl.value >= 0 || volumeControl.value <= 1) {
        video.volume = volumeControl.value;
        if (volumeControl.value == 0 && !video.muted) {
            logosToggler(muteLogo, unMuteLogo)
            video.muted = true;
            currentVolumeEqualZero = true;
        } else if (volumeControl.value > 0 && video.muted) {
            logosToggler(muteLogo, unMuteLogo)
            video.muted = false;
            currentVolumeEqualZero = false;
        }
    } else {
        console.log("volumeControl.value should be between 0 and 1 : " + volumeControl.value);
    }
});

// Full screen
// =================================================

const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoContainer = document.querySelector('.custom-video-player');

const deFullScreenLogo = document.getElementById('deFullScreenLogo');
const fullScreenLogo = document.getElementById('fullScreenLogo');

function fullScreenOrSmallScreenHandler() {
    if (!document.fullscreenElement) {
        // if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
        logosToggler(fullScreenLogo, deFullScreenLogo);
        // } else if (videoContainer.webkitRequestFullscreen) { // Safari
        //     videoContainer.webkitRequestFullscreen();
        // } else if (videoContainer.msRequestFullscreen) { // IE11
        //     videoContainer.msRequestFullscreen();
        // }
        // fullscreenBtn.textContent = 'Exit Fullscreen';
    } else {
        // if (document.exitFullscreen) {
        document.exitFullscreen();
        logosToggler(fullScreenLogo, deFullScreenLogo);
        // } else if (document.webkitExitFullscreen) { // Safari
        // document.webkitExitFullscreen();
        // } else if (document.msExitFullscreen) { // IE11
        // document.msExitFullscreen();
        // }
        // fullscreenBtn.textContent = 'Fullscreen';
    }
}
fullscreenBtn.addEventListener('click', fullScreenOrSmallScreenHandler);
// video.addEventListener('dblclick', fullScreenOrSmallScreenHandler);
video.addEventListener('dblclick', () => {
    clearTimeout(clickTimeout);
    clickIndex = 0;
    fullScreenOrSmallScreenHandler();
    console.log(clickIndex)
});

// Well well weeeeeeell
// ================================================

const progressBarInput = document.getElementById('progressBarInput');
const progressBar = document.getElementById('progressBar');

window.addEventListener('load', () => {
    if (isNaN(progressBarInput.value) || isNaN(video.currentTime) || isNaN(video.duration)) {
        console.log(progressBarInput.value, video.currentTime, video.duration)
        throw new Error('amongus sus')
    } else {
        // Update progress bar as video plays
        video.addEventListener('timeupdate', () => {
            progressBarInput.value = Math.floor((video.currentTime * 100)) / video.duration;
            progressBar.style.width = `${progressBarInput.value}%`
        });

        // Update progress bar as input change
        progressBarInput.addEventListener('input', (e) => {
            video.currentTime = Math.floor((progressBarInput.value * video.duration)) / 100;
            progressBar.style.width = `${progressBarInput.value}%`
        });
    }
});

