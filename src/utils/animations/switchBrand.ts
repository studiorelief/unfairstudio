import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initSwitchBrandAnimation() {
  // Find the switch_brand element
  const switchBrandElement = document.querySelectorAll('[switch_brand_color]');
  const navbarBrandElement = document.querySelectorAll('.navbar_component');

  if (!switchBrandElement) {
    return;
  }

  // Create the scroll trigger
  ScrollTrigger.create({
    markers: false,
    trigger: '[switch_brand_trigger]',
    start: '-600 50%',
    end: '100% 0%', // Trigger when the top of the element reaches the center of the viewport
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
      navbarBrandElement.forEach((element) => {
        element.classList.remove('u-brand-whitemode');
      });
    },
    onLeaveBack: () => {
      switchBrandElement.forEach((element) => {
        element.classList.remove('u-brand-whitemode');
      });
    },
  });

  // Check if solutions blob assets exist
  const solutionsBlobAssets = document.querySelector('.solutions_blob_assets');

  if (solutionsBlobAssets) {
    ScrollTrigger.create({
      markers: false,
      trigger: '[switch_brand_trigger]',
      start: '-400 50%',
      end: '100% 50%',
      onEnter: () => {
        setTimeout(() => {
          gsap.fromTo(
            '.solutions_blob_assets',
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              ease: 'linear',
            }
          );
        }, 600);
      },
      onEnterBack: () => {
        setTimeout(() => {
          gsap.fromTo(
            '.solutions_blob_assets',
            { opacity: 1 },
            {
              opacity: 1,
              duration: 0.3,
              ease: 'linear',
            }
          );
        }, 600);
      },
      onLeaveBack: () => {
        setTimeout(() => {
          gsap.fromTo(
            '.solutions_blob_assets',
            { opacity: 1 },
            {
              opacity: 0,
              duration: 0,
              ease: 'linear',
            }
          );
        }, 0);
      },
    });
  }
}
