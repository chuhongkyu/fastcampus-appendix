import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 

export function pageExample06 () {
  makeMainVideo()
  makeSection()
}

const makeMainVideo = () => {
  const html = document.documentElement;
  const canvas = document.getElementById("scrollAnimation");
  const context = canvas.getContext("2d");
  const frameCount = 130;
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

  img.onload = () =>{
    const x = (canvas.width - img.width) / 2;
    const y = (canvas.height - img.height) / 2;
    context.drawImage(img, x, y);
  }

  const updateImage = index => {
    img.src = currentFrame(index);
    const x = (canvas.width - img.width) / 2;
    const y = (canvas.height - img.height) / 2;
    context.drawImage(img, x, y);
  }

  window.addEventListener('scroll', () => {  
    const scrollFraction = html.scrollTop / (html.scrollHeight - window.innerHeight);
    const frameIndex = Math.round(scrollFraction * (frameCount - 1));
    
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

    gsap.set(imgs, { opacity: 0, scale: 0});

    gsap.to(imgs, {
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        transformOrigin: "center center",
        scrollTrigger: {
            trigger: sections[2], 
            start: "top top",
            markers: true,
            pin:true,
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