import gsap from 'gsap';

export function initFloatingLogosAnimation() {
  // Select all logo elements
  const logoElements = [
    document.querySelector('.solutions_tools_logo.is-mistral'),
    document.querySelector('.solutions_tools_logo.is-claude'),
    document.querySelector('.solutions_tools_logo.is-gpt'),
    document.querySelector('.solutions_tools_logo.is-gemini'),
    document.querySelector('.solutions_tools_logo.is-deepseek'),
  ].filter(Boolean);

  // If no elements are found, exit the function
  if (logoElements.length === 0) {
    return;
  }

  // Add floating effect for each logo with different parameters
  logoElements.forEach((logo, index) => {
    // Random values for more natural movement - increased amounts for more pronounced effect
    const yAmount = 20 + Math.random() * 20;
    // const xAmount = 15 + Math.random() * 12;
    const rotationAmount = 6 + Math.random() * 8;
    // const rotationAmount = 12.5;
    const duration = 3 + index * 0.5 + Math.random() * 1;
    const delay = Math.random() * 1.2;

    // Create floating animation
    gsap.to(logo, {
      y: yAmount,
      //   x: xAmount / 2,
      rotation: rotationAmount / 2,
      duration: duration,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Add a second animation for more complex movement
    gsap.to(logo, {
      //   x: -xAmount,
      rotation: -rotationAmount,
      duration: duration * 1.2,
      delay: delay * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  });

  // Select all logo asset elements
  const logoAssets = document.querySelectorAll('.solutions_tools_logo-asset');
  const assetSection = document.querySelector('.section_solutions_tools, .section_team_baseline');

  if (logoAssets.length > 0 && assetSection) {
    // Create scroll animations with different speeds for each asset
    logoAssets.forEach((asset, index) => {
      const speed = 1 + index * 0.2; // Different speed for each asset
      const rotationAmount = (45 + index * 45) / 1.5; // Different rotation for each asset, reduced by half

      gsap.set(asset, {
        y: '20rem',
        rotateZ: 0,
      });

      gsap.to(asset, {
        scrollTrigger: {
          trigger: assetSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
        y: '-20rem',
        rotateZ: rotationAmount / 4,
        ease: 'none',
        duration: speed,
      });
    });
  }
}

// Function to initialize the animation when the DOM is ready
export function initScrollTools() {
  window.addEventListener('DOMContentLoaded', () => {
    initFloatingLogosAnimation();
  });
}
