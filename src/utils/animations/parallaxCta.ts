import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function parallaxCta() {
  const ctaSection = document.querySelector('.section_cta');
  const ctaContent = document.querySelector('.cta_content');

  if (!ctaSection || !ctaContent) return;

  gsap.fromTo(
    ctaContent,
    {
      y: '-10rem',
    },
    {
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
      y: '0rem',
      ease: 'none',
    }
  );
}
