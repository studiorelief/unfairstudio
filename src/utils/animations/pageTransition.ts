import { data } from '@barba/core';
import gsap from 'gsap';

export function gsapTransition() {
  const transitionWrapper = document.querySelector('.transition_component');

  const AnimationPageText = () => {
    const dataNamespace = data.next.namespace;
    // console.log(dataNamespace);
    const transitionText = document.querySelector('.transition_text');
    if (transitionText) {
      transitionText.textContent = dataNamespace;
    }
  };
  AnimationPageText();

  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: 'power2.inOut',
    },
  });

  tl.fromTo(
    transitionWrapper,
    {
      display: 'none',
      y: '0vw',
      opacity: 0,
      //   duration: 0.25,
    },
    {
      display: 'flex',
      y: '0vw',
      opacity: 1,
      duration: 0.25,
      ease: 'power1.out',
    }
  ).to(transitionWrapper, {
    y: '-12.5vw',
    opacity: 0,
    duration: 0.25,
    delay: 0.5,
    ease: 'power1.in',
  });
}
