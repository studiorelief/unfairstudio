import gsap from 'gsap';

export const homeHeroSun = () => {
  gsap.to('.home_hero_sun-1', {
    width: '40%',
    repeat: -1,
    duration: 10,
    ease: 'linear',
    yoyo: true, // Makes the animation reverse smoothly back to initial state
  });
  gsap.to('.home_hero_sun-3', {
    width: '50%',
    repeat: -1,
    duration: 10,
    ease: 'linear',
    yoyo: true, // Makes the animation reverse smoothly back to initial state
  });
  gsap.to('.home_hero_sun-3', {
    width: '100%',
    repeat: -1,
    duration: 10,
    ease: 'linear',
    yoyo: true, // Makes the animation reverse smoothly back to initial state
  });
};
