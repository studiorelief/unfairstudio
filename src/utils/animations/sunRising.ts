import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fearBackgroundAnimation = () => {
  gsap.set('.home_fear_background_2', {
    y: '5rem',
  });
  gsap.to('.home_fear_background_2', {
    scrollTrigger: {
      trigger: '.section_home_fear',
      start: '-25% 75%',
      end: '150% 75%',
      scrub: true,
      markers: false,
    },
    y: '-25rem',
    ease: 'none',
  });
  gsap.set('.home_fear_background_1, .home_fear_background_3', {
    y: '-5rem',
  });
  gsap.to('.home_fear_background_1, .home_fear_background_3', {
    scrollTrigger: {
      trigger: '.section_home_fear',
      start: '0% 100%',
      end: '100% 0%',
      scrub: true,
      markers: false,
    },
    y: '5rem',
    ease: 'none',
  });
};
