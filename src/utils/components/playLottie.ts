import { DotLottie } from '@lottiefiles/dotlottie-web';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const playLottie = () => {
  // Use autoplay: true to ensure proper initialization
  const dotLottie = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('#dotlottie-canvas') as HTMLCanvasElement,
    src: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie', // or .json file
  });

  // Set up click event listener with more explicit state handling
  ScrollTrigger.create({
    markers: true,
    trigger: '#dotlottie-canvas',
    start: 'top center',
    onEnter: () => {
      dotLottie.play();
    },
    onLeaveBack: () => {
      dotLottie.pause();
    },
  });

  // Stop animation after it's loaded and ready
  dotLottie.addEventListener('ready', () => {
    // Small delay to ensure animation is fully initialized
    setTimeout(() => {
      dotLottie.pause();
    }, 50);
  });
};
