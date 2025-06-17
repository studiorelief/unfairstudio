import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function accordionScrollTrigger(): void {
  const accordionSection = document.querySelector('.section_home_h-accordion');

  if (!accordionSection) return;

  // Set initial active state to first accordion
  const firstAccordion = document.querySelector('.home_h-accordion_horizontal-component.is-1');
  if (firstAccordion) {
    firstAccordion.classList.add('active');
    const bottomElement = firstAccordion.querySelector('.home_h-accordion_horizontal-bottom');
    if (bottomElement) {
      bottomElement.classList.add('active');
    }
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section_home_h-accordion',
      start: 'top 100%',
      end: 'bottom 0%',
      scrub: true,
      markers: false,
      onEnter: () => {
        // Ensure first accordion is active when entering
        const firstAccordion = document.querySelector(
          '.home_h-accordion_horizontal-component.is-1'
        );
        if (firstAccordion) {
          firstAccordion.classList.add('active');
          const bottomElement = firstAccordion.querySelector('.home_h-accordion_horizontal-bottom');
          if (bottomElement) {
            bottomElement.classList.add('active');
          }
        }
      },
      onLeaveBack: () => {
        // Reset to first accordion when scrolling back up
        const accordionComponents = document.querySelectorAll(
          '.home_h-accordion_horizontal-component'
        );
        accordionComponents.forEach((component) => {
          component.classList.remove('active');
          const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
          if (bottomElement) {
            bottomElement.classList.remove('active');
          }
        });

        const firstAccordion = document.querySelector(
          '.home_h-accordion_horizontal-component.is-1'
        );
        if (firstAccordion) {
          firstAccordion.classList.add('active');
          const bottomElement = firstAccordion.querySelector('.home_h-accordion_horizontal-bottom');
          if (bottomElement) {
            bottomElement.classList.add('active');
          }
        }
      },
      onUpdate: (self) => {
        // Remove active class from all components
        const accordionComponents = document.querySelectorAll(
          '.home_h-accordion_horizontal-component'
        );
        accordionComponents.forEach((component) => {
          component.classList.remove('active');
          const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
          if (bottomElement) {
            bottomElement.classList.remove('active');
          }
        });

        // Add active class based on scroll progress
        let targetClass = '';
        if (self.progress >= 0.5) {
          targetClass = 'is-3';
        } else if (self.progress >= 0.3) {
          targetClass = 'is-2';
        } else if (self.progress >= 0.2) {
          targetClass = 'is-1';
        }

        if (targetClass) {
          const targetComponent = document.querySelector(
            `.home_h-accordion_horizontal-component.${targetClass}`
          );
          if (targetComponent) {
            targetComponent.classList.add('active');
            const bottomElement = targetComponent.querySelector(
              '.home_h-accordion_horizontal-bottom'
            );
            if (bottomElement) {
              bottomElement.classList.add('active');
            }
          }
        } else {
          // If no target class, ensure first accordion is active
          const firstAccordion = document.querySelector(
            '.home_h-accordion_horizontal-component.is-1'
          );
          if (firstAccordion) {
            firstAccordion.classList.add('active');
            const bottomElement = firstAccordion.querySelector(
              '.home_h-accordion_horizontal-bottom'
            );
            if (bottomElement) {
              bottomElement.classList.add('active');
            }
          }
        }
      },
    },
  });

  tl.from(accordionSection, {
    duration: 1,
    ease: 'power2.out',
  });
}

// export function initAccordion(): void {
//   const accordionComponents = document.querySelectorAll('.home_h-accordion_horizontal-component');

//   accordionComponents.forEach((component) => {
//     component.addEventListener('click', () => {
//       // Remove active class from all previously active elements
//       const activeElements = document.querySelectorAll('.active');
//       activeElements.forEach((element) => element.classList.remove('active'));

//       // Add active class to clicked component
//       component.classList.add('active');

//       // Add active class to bottom element within component
//       const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
//       if (bottomElement) {
//         bottomElement.classList.add('active');
//       }
//     });
//   });
// }
