import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function dataCardsStagger(): void {
  const trigger = document.querySelector('.home_grid-data_content');
  const cards = document.querySelectorAll('.home_grid-data_cards');

  if (!trigger || !cards.length) return;

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: '100%',
    },
    {
      opacity: 1,
      y: '0%',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: trigger,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    }
  );
}
