var FRAMES = 148;
var FPS = 30;
var video = document.getElementById('video');

window.addEventListener('scroll', function (e) {
  var time = (window.scrollY / 1000) * FRAMES / FPS;
  video.currentTime = time;
  console.log(time);
  // alert('Hizo scroll')
});

window.addEventListener('load', function(e) {
  video.pause();
  video.currentTime = 0;
});