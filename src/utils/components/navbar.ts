import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initNavbarScrollAnimation = () => {
  const navbar = document.querySelector('.navbar_component');
  const navbarLogo = document.querySelector('.navbar_logo-link');
  const navbarMenu = document.querySelector('.navbar_menu');
  if (!navbar || !navbarLogo || !navbarMenu) return;

  let lastScrollTop = 0;
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll === 0) {
      gsap.to([navbarLogo, navbarMenu], {
        y: '0rem',
      });
    } else if (currentScroll < lastScrollTop) {
      gsap.to([navbarLogo, navbarMenu], {
        y: '0rem',
      });
    } else {
      gsap.to([navbarLogo, navbarMenu], {
        y: '-10rem',
      });
    }

    lastScrollTop = currentScroll;
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll);
};
