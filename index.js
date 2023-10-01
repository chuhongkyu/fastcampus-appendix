import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Get the image container element
const imageContainer = document.querySelector('.image-container');

// Function to add images to the container
const addImagesToContainer = () => {
    for (let i = 1; i <= 355; i++) {
        const img = new Image();
        img.src = `assets/img/${i}.jpg`; // Adjust the path to your image files
        img.classList.add('scroll-image');
        imageContainer.appendChild(img);
    }
};

// Create a ScrollTrigger animation
gsap.to('.scroll-image', {
    scrollTrigger: {
        trigger: ".image-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Smooth scrolling effect
    },
    opacity: 0, // Example animation (you can customize)
    scale: 0.5, // Example animation (you can customize)
});

// Add images to the container
addImagesToContainer();
