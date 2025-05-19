import './index.css';

import { clockAnimation } from '$utils/animations/clockAnimation';
import { ctaRoundLoop } from '$utils/animations/ctaRoundLoop';
import { homeHeroSun } from '$utils/animations/homeHeroSun';
import { fearBackgroundAnimation } from '$utils/animations/sunRising';
import { initSwitchBrandAnimation } from '$utils/animations/switchBrand';
import { initAccordion } from '$utils/components/hAccordion';
import { initNavbarScrollAnimation } from '$utils/components/navbar';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* components */
  initNavbarScrollAnimation();
  initAccordion();

  /* animations */
  homeHeroSun();
  initSwitchBrandAnimation();
  fearBackgroundAnimation();
  ctaRoundLoop();
  clockAnimation();
});
