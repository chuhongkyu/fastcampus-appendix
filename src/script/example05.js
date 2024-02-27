import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 

function pageExample05 () {
  makeMainVideo()
  makeSection()
}

const makeMainVideo = () => {
  const html = document.documentElement;
  const canvas = document.getElementById("scrollAnimation");
  const context = canvas.getContext("2d");
  const frameCount = 129;
  const currentFrame = index => (
    `assets/img/dog_${index.toString().padStart(3, '0')}.jpg`
  )

  const img = new Image()
  img.src = currentFrame(1);

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  if(viewportWidth <= 1024){
    canvas.width = 1024;
    canvas.height = 720;
  }else{
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;
  }

  let loadedImages = {};

  img.onload = () =>{
    const x = (canvas.width - img.width) / 2;
    const y = (canvas.height - img.height) / 2;
    context.drawImage(img, x, y);
  }

  const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages[i] = img;
    }
  };

  preloadImages();

  const updateImage = index => {
    const loadedImage = loadedImages[index];
    if (loadedImage) { 
      const x = (canvas.width - loadedImage.width) / 2;
      const y = (canvas.height - loadedImage.height) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(loadedImage, x, y);
    }
  }

  window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight
    const scrollFraction = scrollTop / maxScrollTop;
    
    const frameIndex = Math.min(
      frameCount -1,
      Math.ceil(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });
}

const makeSection = () => {
  const sections = document.querySelectorAll(".section");
  const production = document.querySelector(".product-explain");

  const title = document.querySelector(".title");

  const tl = gsap.timeline({
    scrollTrigger: {
        trigger: sections[1], 
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=300%",
        // markers: true,
        toggleActions: "play reverse play reverse"
    }
  });
  tl.from(title, {
      autoAlpha: 0,
      duration: 2,
      ease: "none"
  });
  
  const t2 = gsap.timeline({
      scrollTrigger: {
          trigger: sections[2],
          pin: true,
          scrub: 0.3,
          start: "top top",
          end: "+=300%",
      }
  });
  t2.from(production, {x: '300%', autoAlpha: 0, duration:2, ease: "none", stagger:3})
  .to(production, { duration: 3 })
  
  gsap.to(production.querySelector('.dot'), { duration: 1, opacity: 1, scale: 1.2, repeat: Infinity})

}

document.addEventListener('DOMContentLoaded', () => {
  pageExample05()
})