
export function pageExample03 () {
  const html = document.documentElement;
  const canvas = document.getElementById("scrollAnimation");
  const context = canvas.getContext("2d");

  const frameCount = 350;
  const currentFrame = index => (
    `assets/img/${index}.jpg`
  )

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width= 1280;
  canvas.height = 740;
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