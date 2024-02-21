function pageExample01 () {
  const video = document.getElementById('video');

  window.addEventListener('scroll', () => {
    const time = (window.scrollY / 1000) * 5
    video.currentTime = time;
    // console.log(time)
  });

  window.addEventListener('load', () => {
    video.pause();
    video.currentTime = 0;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  pageExample01()
})