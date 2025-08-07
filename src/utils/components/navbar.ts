import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initNavbarScrollAnimation() {
  const navbar = document.querySelector('.navbar_component');
  const navbarLogo = document.querySelector('.navbar_logo-link');
  const navbarMenu = document.querySelector('.navbar_menu');

  if (!navbar || !navbarLogo || !navbarMenu) return;

  let lastScrollTop = 0;
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll === 0) {
      gsap.to([navbarMenu], {
        y: '0rem',
      });
    } else if (currentScroll < lastScrollTop) {
      gsap.to([navbarMenu], {
        y: '0rem',
      });
    } else {
      gsap.to([navbarMenu], {
        y: '-10rem',
      });
    }

    lastScrollTop = currentScroll;
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll);

  // Menu toggle functionality
  const menuButton = document.querySelector('.navbar_menu-button');
  const menuWrapper = document.querySelector('.navbar_menu-w');
  const menuLayer = document.querySelector('.navbar_menu-layer');
  const menu = document.querySelector('.navbar_menu');

  if (!menuButton || !menuWrapper || !menuLayer || !menu) return;

  let isMenuOpen = false;

  const closeMenu = () => {
    isMenuOpen = false;
    menuButton.classList.add('is-open');
    menuButton.classList.remove('is-close');

    // gsap.to('.navbar_component', {
    //   mixBlendMode: 'difference',
    //   delay: 0.3,
    //   duration: 0.3,
    // });

    gsap.to(menu, {
      y: '2rem',
      opacity: 0,
      duration: 0.4,
    });

    gsap.to(menuLayer, {
      opacity: 0,
      duration: 0.3,
    });

    setTimeout(() => {
      (menuWrapper as HTMLElement).style.display = 'none';
    }, 400);
  };

  const openMenu = () => {
    isMenuOpen = true;
    menuButton.classList.add('is-close');
    menuButton.classList.remove('is-open');
    (menuWrapper as HTMLElement).style.display = 'flex';

    gsap.fromTo(
      menu,
      {
        y: '2rem',
        opacity: 0,
      },
      {
        y: '0rem',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }
    );

    gsap.to(menuLayer, {
      opacity: 1,
      duration: 0.3,
    });

    gsap.to('.navbar_component', {
      mixBlendMode: 'normal',
      // delay: 0.3,
      duration: 0.3,
    });
  };

  if (window.innerWidth < 990) {
    menuButton.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    const menuLinks = document.querySelectorAll('.navbar_link');
    menuLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  menuLayer.addEventListener('click', closeMenu);
}
