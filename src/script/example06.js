import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 

export function pageExample06 () {
  makeMainVideo()
  makeSection()
  makeHeader()
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
  const imgs = document.querySelector(".conatiner-img")
  const cards = document.querySelectorAll(".card");

  const footer = document.querySelector("footer");
  const footerHeight = footer.clientHeight;
  console.log(footerHeight)

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
          // markers: true,
          pin: true,
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
  t3.from(cards, {x: '300%', autoAlpha: 0, duration:2, ease: "none", stagger:3})
  .to(cards, {duration: 3})

  gsap.set(footer, { height: 0 })
  const t4 = gsap.timeline({
    scrollTrigger: {
        trigger: sections[4],
        start: "bottom bottom",
        end: "bottom bottom",
        // markers: true
      }
  });
  t4.from(footer, { height: 0 })
  .to(footer, { duration: 1, y: -100, height: footerHeight, ease: "power4.out" })
}

const makeHeader = () => {
  const body = document.querySelector("body");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      body.classList.remove("up");
      return;
    }
    
    if (currentScroll > lastScroll && !body.classList.contains("down")) {
      body.classList.remove("up");
      body.classList.add("down");
    } else if (currentScroll < lastScroll && body.classList.contains("down")) {
      body.classList.remove("down");
      body.classList.add("up");
    }
    lastScroll = currentScroll;
  });
};
