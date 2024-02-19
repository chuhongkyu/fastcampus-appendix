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
  const icons = document.querySelectorAll(".icon-container img")
  const prodution = document.querySelector(".product-explain");

  const imgSection = document.querySelector(".img-container")

  const footer = document.querySelector("footer");
  const footerHeight = footer.clientHeight;
  console.log(footerHeight)

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
  t2.from(prodution, {x: '300%', autoAlpha: 0, duration:2, ease: "none", stagger:3})
  .to(prodution, { duration: 3 })
  
  gsap.to(prodution.querySelector('.dot'), { duration: 1, opacity: 1, scale: 1.2, repeat: Infinity})


  gsap.set(icons, { opacity: 0, scale: 0});
  gsap.set(icons[2], { opacity: 0, scale: 0, rotateZ: 35});
  gsap.to(icons, {
      opacity: 1,
      scale: 1,
      stagger: 0.04,
      scrollTrigger: {
          trigger: sections[3], 
          start: "top top",
          end: "+=300%",
          // markers: true,
          pin: true,
          toggleActions: "play reverse play reverse"
      },
      ease: "elastic.inOut(1.2, 0.75)",
  });

  gsap.set(imgSection, { y: -100})
  const t4 = gsap.timeline()
  t4.fromTo(imgSection, {
    y: -100
  },
  {
    y: 0,
    scale: 0.8,
    duration: 2,
    stagger: 0.5,
    ease: "power4.out",
    scrollTrigger: {
      pin: sections[4],
      // markers: true,
      scrub: true,
      start: "top center",
      end: "+=10000",
      invalidateOnRefresh: true
    }
  })
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
