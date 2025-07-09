import './index.css';

import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { clockAnimation } from '$utils/animations/clockAnimation';
import { ctaRoundLoop } from '$utils/animations/ctaRoundLoop';
import { heroTextSwitch } from '$utils/animations/heroTextSwitch';
import { homeCardsScroll } from '$utils/animations/homeCardsScroll';
import { homeHeroSun } from '$utils/animations/homeHeroSun';
import { marqueeAnimation } from '$utils/animations/marquee';
import { gsapTransition } from '$utils/animations/pageTransition';
import { parallaxCta } from '$utils/animations/parallaxCta';
import { initFloatingLogosAnimation } from '$utils/animations/scrollTools';
import { fearBackgroundAnimation } from '$utils/animations/sunRising';
import { swiperCrossfade } from '$utils/animations/swiperTools';
import { initSwitchBrandAnimation } from '$utils/animations/switchBrand';
import {
  initColorScrollHome,
  initColorScrollSolutions,
  initColorScrollTeam,
} from '$utils/animations/switchBrandScroll';
import { teamAnimation } from '$utils/animations/teamAnimation';
import { autoTabs } from '$utils/components/autoTabs';
import { /* initAccordion, */ accordionScrollTrigger } from '$utils/components/hAccordion';
import { initNavbarScrollAnimation } from '$utils/components/navbar';
import { popupContact } from '$utils/components/popupContact';
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
  heroTextSwitch();
  popupContact();

  /* footer */
  marqueeAnimation();
  parallaxCta();

  /* tools */
  initMarker();
  swiperCrossfade();
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
          y: '-25vw',
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
        // Animate hero background cells color change

        // Fade in animation for hero sun wrapper
        gsap.from('.hero_sun-wrapper, hero_background', {
          opacity: 0,
          duration: 1,
          delay: 1.75,
          ease: 'power2.out',
        });

        gsap.fromTo(
          '.hero_background-cell',
          {
            backgroundColor: 'var(--_brand---background--primary)',
          },
          {
            backgroundColor: 'var(--_brand---background--secondary)',
            duration: 3,
            delay: 1,
            ease: 'power2.out',
          }
        );

        // Original container animation
        return gsap.from(data.next.container, {
          y: '25vw',
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
        if (window.innerWidth > 991) {
          fearBackgroundAnimation();
          /* 
          ! @fearBackgroundAnimation create bug on first homeCardsScroll scrolltrigger animation
          ! à checker - pass mobile
          */
          initColorScrollHome();
          initSwitchBrandAnimation();
          homeCardsScroll();
          clockAnimation();
          accordionScrollTrigger();
          autoTabs();
          // initAccordion();
        }
      },
    },
    {
      namespace: 'solutions',
      beforeEnter() {
        initColorScrollSolutions();
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
        initColorScrollTeam();
        initSwitchBrandAnimation();
        initFloatingLogosAnimation();

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
  document.querySelectorAll('.trigger-mode, .navbar_component').forEach((element) => {
    element.removeAttribute('switch_brand_trigger');
    element.removeAttribute('switch_color_trigger');
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
  document.querySelectorAll('.trigger-mode, .navbar_component').forEach((element) => {
    element.setAttribute('switch_brand_trigger', '');
    element.setAttribute('switch_color_trigger', '');
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

  // Créer un petit délai pour s'assurer que tout est bien rendu
  // setTimeout(() => {
  //   ScrollTrigger.refresh();
  // }, 100);
});
