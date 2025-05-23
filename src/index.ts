import './index.css';

import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { clockAnimation } from '$utils/animations/clockAnimation';
import { ctaRoundLoop } from '$utils/animations/ctaRoundLoop';
import { homeHeroSun } from '$utils/animations/homeHeroSun';
import { marqueeAnimation } from '$utils/animations/marquee';
import { gsapTransition } from '$utils/animations/pageTransition';
import { initFloatingLogosAnimation } from '$utils/animations/scrollTools';
import { fearBackgroundAnimation } from '$utils/animations/sunRising';
import { initSwitchBrandAnimation } from '$utils/animations/switchBrand';
import { teamAnimation } from '$utils/animations/teamAnimation';
import { autoTabs } from '$utils/components/autoTabs';
import { initAccordion } from '$utils/components/hAccordion';
import { initNavbarScrollAnimation } from '$utils/components/navbar';
import { loadScript } from '$utils/tools/loadScript';
import { initMarker } from '$utils/tools/marker';
// import { playLottie } from '$utils/components/playLottie';

/* 
! Global init - First load
*/
/* navbar */
const initGlobalAnimations = () => {
  initNavbarScrollAnimation();
  homeHeroSun();
  ctaRoundLoop();

  /* footer */
  marqueeAnimation();

  /* tools */
  initMarker();
};

initGlobalAnimations();

/* 
! Barba init
*/

barba.init({
  transitions: [
    {
      name: 'page-transition',
      leave(data: { current: { container: HTMLElement } }) {
        //  gsapTransitionOut();
        return gsap.to(data.current.container, {
          x: '25vw',
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out',
        });
      },
      beforeEnter(data: { next: { container: HTMLElement } }) {
        gsapTransition();
        // Réinitialiser la hauteur du container entrant
        data.next.container.style.height = 'auto';
        data.next.container.style.position = 'relative';
      },
      after(data: { next: { container: HTMLElement } }) {
        // await gsapTransitionV2Out();
        return gsap.from(data.next.container, {
          x: '-25vw',
          opacity: 0,
          duration: 0.5,
          delay: 1.25,
          ease: 'power1.out',
        });
      },
    },
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        fearBackgroundAnimation();
        initSwitchBrandAnimation();
        autoTabs();
        initAccordion();
        clockAnimation();
      },
    },
    {
      namespace: 'solutions',
      beforeEnter() {
        initSwitchBrandAnimation();
        initFloatingLogosAnimation();
        // playLottie();
      },
    },
    {
      namespace: 'studio',
      beforeEnter() {},
    },
    {
      namespace: 'team',
      beforeEnter() {
        initSwitchBrandAnimation();
        Promise.all([
          loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),
        ]);
        teamAnimation();
      },
    },
  ],
});

/* 
! Barba Hooks
*/

/* 
! Barba Hooks - Global
*/

barba.hooks.beforeEnter(() => {
  initGlobalAnimations();
});

barba.hooks.beforeLeave((data: { current: { container: HTMLElement } }) => {
  // Positionner le container current en absolute pour la transition
  data.current.container.style.position = 'absolute';
  data.current.container.style.top = '0';
  data.current.container.style.left = '0';
  data.current.container.style.width = '100%';

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
  // ScrollTrigger.clearMatchMedia();

  // Remove switch_brand_trigger attribute from trigger-mode elements
  document.querySelectorAll('.trigger-mode').forEach((element) => {
    element.removeAttribute('switch_brand_trigger');
  });

  restartWebflow();
});

/* 
! Barba Hooks - beforeEnter
*/

barba.hooks.beforeEnter(() => {
  restartWebflow();

  // scroll to top
  window.scrollTo(0, 0);

  // set darkmode
  document.querySelectorAll('[switch_brand_color]').forEach((element) => {
    element.classList.remove('u-brand-whitemode');
  });

  // Remove switch_brand_trigger attribute from trigger-mode elements
  document.querySelectorAll('.trigger-mode').forEach((element) => {
    element.setAttribute('switch_brand_trigger', '');
  });

  // Reset videos
  const video = document.querySelectorAll('video');
  if (video) {
    video.forEach((v) => {
      v.play();
    });
  }
});

/* 
! Barba Hooks - AfterEnter
*/

barba.hooks.afterEnter(() => {
  // Forcer une mise à jour du DOM
  document.body.style.height = 'auto';
  document.documentElement.style.height = 'auto';

  // Forcer le recalcul complet des ScrollTriggers
  ScrollTrigger.refresh(true);

  // Créer un petit délai pour s'assurer que tout est bien rendu
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});
