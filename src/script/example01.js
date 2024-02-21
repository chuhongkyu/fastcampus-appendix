function pageExample01 () {
  const FRAMES = 150;
  const FPS = 29.97;
  const video = document.getElementById('video');

  window.addEventListener('scroll', () => {
    const time = (window.scrollY / 1000) * FRAMES / FPS
    video.currentTime = time;
  });

  window.addEventListener('load', () => {
    video.pause();
    video.currentTime = 0;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  pageExample01()
})