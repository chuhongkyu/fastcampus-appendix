import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // GSAP ScrollTrigger 가져오기

gsap.registerPlugin(ScrollTrigger); 

export function pageExample04 () {
  sectionFirst()
  sectionSecond()
  
}

const sectionFirst = () => {
  const html = document.documentElement;
  const canvas = document.getElementById("scrollAnimation");
  const context = canvas.getContext("2d");
  const copy = document.getElementById("title");

  const frameCount = 480;
  const currentFrame = index => (
    `/assets/img/${index}.jpg`
  )

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width= 1280;
  canvas.height=740;
  img.onload=function(){
    context.drawImage(img, 0, 0);
  }

  const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  }

  window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight
    const scrollFraction = scrollTop / maxScrollTop;
    
    copy.style.opacity = scrollFraction > 0.5 ? (1 - scrollFraction) : scrollFraction * 2;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  preloadImages()
}

const sectionSecond = () => {
  const ScrollMain = window.document.getElementById('main-04');
  const section = document.querySelector('.scroll-container.second')
  const boxs = document.querySelectorAll(".horizon_box");

  const tl = gsap.timeline({
    scrollTrigger: {
        trigger: section,
        start:'top top',
        end: 'bottom bottom',
        markers: true,
        scrub: 0,
        pin: true,
    }
  })

  tl.to(boxs, {xPercent: -500, duration:2, ease: "none", stagger:3})
    .to({},{duration:1});
}