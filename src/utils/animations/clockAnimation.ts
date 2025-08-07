import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function clockAnimation() {
  gsap.set('.home_clock_animation-image', {
    y: '5rem',
  });
  if (window.innerWidth > 991) {
    gsap.to('.home_clock_animation-image', {
      scrollTrigger: {
        markers: false,
        trigger: '.section_home_clock',
        start: '0% 100%',
        end: '100% 0%',
        scrub: true,
      },
      y: '-5rem',
      ease: 'none',
    });
  }

  gsap.to('.home_clock_animation-short-rotation', {
    scrollTrigger: {
      markers: false,
      trigger: '.section_home_clock',
      start: 'top 50%',
      end: '100% 100%',
      scrub: true,
    },
    rotate: 180,
    ease: 'none',
  });

  gsap.to('.home_clock_animation-long-rotation', {
    scrollTrigger: {
      markers: false,
      trigger: '.section_home_clock',
      start: 'top 50%',
      end: '100% 100%',
      scrub: true,
    },
    rotate: -180,
    ease: 'none',
  });

  // Auto rotation function with increasing angle
  function animateClockHand() {
    // Get current rotation or start at 0
    const clockHand = document.querySelector('.home_clock_animation-long-rotation-auto');
    const currentRotation = clockHand ? gsap.getProperty(clockHand, 'rotation') || 0 : 0;

    // Add 5 degrees to the current rotation
    const newRotation = Number(currentRotation) + 5;

    gsap.to('.home_clock_animation-long-rotation-auto', {
      scrollTrigger: {
        markers: false,
        trigger: '.section_home_clock',
        start: '25% 50%',
        scrub: false,
      },
      rotation: newRotation,
      ease: 'none',
      duration: 0.25,
      delay: 1,
      onComplete: animateClockHand, // Call the function again when animation completes
    });
  }

  // Start the animation
  animateClockHand();
}
