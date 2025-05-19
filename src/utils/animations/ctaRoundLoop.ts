import gsap from 'gsap';

export const ctaRoundLoop = () => {
  gsap.to('.home_hero_ai-challenge-wrapper', {
    rotate: 360,
    repeat: -1,
    duration: 10,
    ease: 'linear',
  });
};
