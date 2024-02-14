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
  const frameCount = 130;
  const currentFrame = index => (
    `assets/img/dog_${index.toString().padStart(3, '0')}.jpg`
  )

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width = 1280;
  canvas.height = 740;
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

const makeSection = () => {
    const sections = document.querySelectorAll(".section");
    const imgs = document.querySelector(".conatiner-img")
    const $sections = document.querySelectorAll(".box");

    gsap.set(imgs, { opacity: 0, scale: 0 });

    gsap.to(imgs, {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        scrollTrigger: {
            trigger: sections[1], 
            start: "top center",
            end: "bottom center",
            markers: true,
            toggleActions: "play reverse play reverse"
        },
        ease: "elastic.inOut(1.2, 0.75)",
    });

    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sections[2],
            pin: true,
            scrub: 0.3,
            start: "top top",
            end: "+=300%",
        }
    });
    tl.from($sections, {x: '300%', autoAlpha: 0, duration:2, ease: "none", stagger:3})
    .to($sections, {duration: 3});

  sections.forEach((section) => {
    const h1 = section.querySelector(".title");

    gsap.set(h1, { opacity: 0 });
    
    gsap.to(h1, {
        opacity: 1,
        scrollTrigger: {
            trigger: section, 
            start: "top center",
            end: "bottom center",
            markers: true,
            toggleActions: "play reverse play reverse"
        },
        duration: 3
    });
});
}