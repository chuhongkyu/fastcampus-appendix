export function pageExample01 () {
  const FRAMES = 148;
  const FPS = 30;
  const video = document.getElementById('video');

  window.addEventListener('scroll', () => {
    const time = (window.scrollY / 1000) * FRAMES / FPS;
    video.currentTime = time;
    console.log(time);
  });

  window.addEventListener('load', () => {
    video.pause();
    video.currentTime = 0;
  });
}