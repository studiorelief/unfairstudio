import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initSwitchBrandAnimation() {
  // Find the switch_brand element
  const switchBrandElement = document.querySelectorAll('[switch_brand_color]');

  if (!switchBrandElement) {
    return;
  }

  // Create the scroll trigger
  ScrollTrigger.create({
    markers: false,
    trigger: '[switch_brand_trigger]',
    start: '0% 50%',
    end: '100% 50%', // Trigger when the top of the element reaches the center of the viewport
    onEnter: () => {
      switchBrandElement.forEach((element) => {
        element.classList.add('u-brand-whitemode');
      });
    },
    onEnterBack: () => {
      switchBrandElement.forEach((element) => {
        element.classList.add('u-brand-whitemode');
      });
    },
    onLeave: () => {
      switchBrandElement.forEach((element) => {
        element.classList.remove('u-brand-whitemode');
      });
    },
    onLeaveBack: () => {
      switchBrandElement.forEach((element) => {
        element.classList.remove('u-brand-whitemode');
      });
    },
  });
}
