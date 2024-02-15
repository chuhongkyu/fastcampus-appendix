import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 

export function pageExample05 () {
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

  canvas.width = viewportWidth;
  canvas.height = viewportHeight;

  img.onload = () =>{
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
    
    const frameIndex = Math.min(
      frameCount,
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

const makeSection = () => {
    const sections = document.querySelectorAll(".section");
    const imgs = document.querySelector(".conatiner-img")
    const Cards = document.querySelectorAll(".card");

    const title1 = document.querySelector(".title1");
    const title2 = document.querySelector(".title2");

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

    tl.from(title1, {
        x: '-300%',
        autoAlpha: 0,
        duration: 2,
        ease: "none"
    });
  
    tl.from(title2, {
        x: '300%',
        autoAlpha: 0,
        duration: 2,
        ease: "none"
    }, "<"); 
    gsap.set(imgs, { opacity: 0, scale: 0 });

    gsap.to(imgs, {
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        scrollTrigger: {
            trigger: sections[2], 
            start: "top center",
            end: "bottom center",
            // markers: true,
            toggleActions: "play reverse play reverse"
        },
        ease: "elastic.inOut(1.2, 0.75)",
    });

    
    const t3 = gsap.timeline({
        scrollTrigger: {
            trigger: sections[3],
            pin: true,
            scrub: 0.3,
            start: "top top",
            end: "+=300%",
        }
    });
    t3.from(Cards, {x: '300%', autoAlpha: 0, duration:2, ease: "none", stagger:3})
    .to(Cards, {duration: 3});
}