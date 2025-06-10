import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function homeCardsScroll(): void {
  const cards = document.querySelectorAll('.home_cards_list');

  if (!cards.length) return;

  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: '0.75rem',
      duration: 0.3,
      scale: 0.95,
      ease: 'power2.out',
      scrollTrigger: {
        markers: false,
        trigger: card,
        start: 'top 95%',
        end: 'bottom 85%',
        scrub: true,
      },
    });
  });
}
