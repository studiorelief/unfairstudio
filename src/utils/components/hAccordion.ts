import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* 
! V2 - With width animation
*/

export function accordionScrollTrigger(): void {
  const accordionSection = document.querySelector('.section_home_h-accordion');

  if (!accordionSection) return;

  // Progress thresholds based on 250vh section height
  const THRESHOLDS = {
    // is-1 active from 0vh to 100vh (0 to 0.4 progress)
    IS_1_END: 100 / 250, // 0.4 - when is-1 starts deactivating

    // is-2 active from 100vh to 200vh (0.4 to 0.8 progress)
    IS_2_START: 100 / 250, // 0.4 - when is-2 starts activating
    IS_2_END: 125 / 250, // 0.8 - when is-2 starts deactivating

    // is-3 active from 200vh to 250vh (0.8 to 1.0 progress)
    IS_3_START: 125 / 250, // 0.8 - when is-3 starts activating
  };

  // Transition zones (can be adjusted for smoother/snappier transitions)
  const TRANSITION_DURATION = 0.05; // 5% of total progress for transitions
  const BOTTOM_ELEMENT_ACTIVE_WIDTH = 50;

  // Helper function to set bottom element active state and link opacity based on component width
  const setBottomElementState = (component: Element, targetWidth: string) => {
    const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
    const linkElement = component.querySelector('.home_h-accordion_link');

    if (bottomElement || linkElement) {
      const widthValue = parseFloat(targetWidth);

      // Bottom element active state
      if (bottomElement) {
        if (widthValue >= BOTTOM_ELEMENT_ACTIVE_WIDTH - 35) {
          bottomElement.classList.add('active');
        } else {
          bottomElement.classList.remove('active');
        }
      }

      if (bottomElement) {
        if (widthValue <= 70) {
          (bottomElement as HTMLElement).style.opacity = '1';
        } else {
          (bottomElement as HTMLElement).style.opacity = '1';
        }
      }

      // Link element opacity
      if (linkElement) {
        if (widthValue <= BOTTOM_ELEMENT_ACTIVE_WIDTH) {
          gsap.to(linkElement, { opacity: 0, duration: 0.1 });
        } else {
          gsap.to(linkElement, { opacity: 0.5, duration: 0.1 });
        }
      }
    }
  };

  // Get all accordion components
  const accordions = {
    'is-1': document.querySelector('.home_h-accordion_horizontal-component.is-1'),
    'is-2': document.querySelector('.home_h-accordion_horizontal-component.is-2'),
    'is-3': document.querySelector('.home_h-accordion_horizontal-component.is-3'),
  };

  // Set initial state - all components at 0% width except first one
  Object.values(accordions).forEach((component, index) => {
    if (component) {
      const initialWidth = index === 0 ? '100%' : '0%';
      gsap.set(component, { width: initialWidth });
      component.classList.toggle('active', index === 0);

      // Set bottom element active state based on initial width
      setBottomElementState(component, initialWidth);
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section_home_h-accordion',
      start: 'top 100%',
      end: 'bottom 0%',
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        const { progress } = self;

        // Remove active class from all components first
        Object.values(accordions).forEach((component) => {
          if (component) {
            component.classList.remove('active');
            const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
            if (bottomElement) {
              bottomElement.classList.remove('active');
            }
          }
        });

        // Progress-based state management
        if (progress < THRESHOLDS.IS_1_END - TRANSITION_DURATION) {
          // 0vh to ~95vh: is-1 fully active at 100% width
          if (accordions['is-1']) {
            accordions['is-1'].classList.add('active');
            gsap.to(accordions['is-1'], { width: '100%', duration: 0.1 });
            setBottomElementState(accordions['is-1'], '100');
          }
          if (accordions['is-2']) {
            gsap.to(accordions['is-2'], { width: '0%', duration: 0.1 });
            setBottomElementState(accordions['is-2'], '0');
          }
          if (accordions['is-3']) {
            gsap.to(accordions['is-3'], { width: '0%', duration: 0.1 });
            setBottomElementState(accordions['is-3'], '0');
          }
        } else if (
          progress >= THRESHOLDS.IS_1_END - TRANSITION_DURATION &&
          progress < THRESHOLDS.IS_2_END - TRANSITION_DURATION
        ) {
          // ~95vh to ~120vh: Transition from is-1 to is-2, then is-2 fully active

          if (progress < THRESHOLDS.IS_1_END + TRANSITION_DURATION) {
            // 95vh to 105vh: Transition from is-1 to is-2
            const transitionStart = THRESHOLDS.IS_1_END - TRANSITION_DURATION;
            const transitionEnd = THRESHOLDS.IS_1_END + TRANSITION_DURATION;
            const transitionProgress =
              (progress - transitionStart) / (transitionEnd - transitionStart);

            const is1Width = 100 - transitionProgress * 100;
            const is2Width = transitionProgress * 100;

            if (accordions['is-1']) {
              accordions['is-1'].classList.add('active');
              gsap.to(accordions['is-1'], { width: `${is1Width}%`, duration: 0.1 });
              setBottomElementState(accordions['is-1'], is1Width.toString());
            }
            if (accordions['is-2']) {
              gsap.to(accordions['is-2'], { width: `${is2Width}%`, duration: 0.1 });
              setBottomElementState(accordions['is-2'], is2Width.toString());
            }
            if (accordions['is-3']) {
              gsap.to(accordions['is-3'], { width: '0%', duration: 0.1 });
              setBottomElementState(accordions['is-3'], '0');
            }
          } else {
            // 105vh to 120vh: is-2 fully active at 100% width
            if (accordions['is-2']) {
              accordions['is-2'].classList.add('active');
              gsap.to(accordions['is-2'], { width: '100%', duration: 0.1 });
              setBottomElementState(accordions['is-2'], '100');
            }
            if (accordions['is-1']) {
              gsap.to(accordions['is-1'], { width: '0%', duration: 0.1 });
              setBottomElementState(accordions['is-1'], '0');
            }
            if (accordions['is-3']) {
              gsap.to(accordions['is-3'], { width: '0%', duration: 0.1 });
              setBottomElementState(accordions['is-3'], '0');
            }
          }
        } else {
          // 120vh to 250vh: Transition from is-2 to is-3, then is-3 fully active

          if (progress < THRESHOLDS.IS_3_START + TRANSITION_DURATION) {
            // 120vh to 130vh: Transition from is-2 to is-3
            const transitionStart = THRESHOLDS.IS_2_END - TRANSITION_DURATION;
            const transitionEnd = THRESHOLDS.IS_3_START + TRANSITION_DURATION;
            const transitionProgress =
              (progress - transitionStart) / (transitionEnd - transitionStart);

            const is2Width = 100 - transitionProgress * 100;
            const is3Width = transitionProgress * 100;

            if (accordions['is-2']) {
              accordions['is-2'].classList.add('active');
              gsap.to(accordions['is-2'], { width: `${is2Width}%`, duration: 0.1 });
              setBottomElementState(accordions['is-2'], is2Width.toString());
            }
            if (accordions['is-3']) {
              gsap.to(accordions['is-3'], { width: `${is3Width}%`, duration: 0.1 });
              setBottomElementState(accordions['is-3'], is3Width.toString());
            }
            if (accordions['is-1']) {
              gsap.to(accordions['is-1'], { width: '0%', duration: 0.1 });
              setBottomElementState(accordions['is-1'], '0');
            }
          } else {
            // 130vh to 250vh: is-3 fully active at 100% width
            if (accordions['is-3']) {
              accordions['is-3'].classList.add('active');
              gsap.to(accordions['is-3'], { width: '100%', duration: 0.1 });
              setBottomElementState(accordions['is-3'], '100');
            }
            if (accordions['is-1']) {
              gsap.to(accordions['is-1'], { width: '0%', duration: 0.1 });
              setBottomElementState(accordions['is-1'], '0');
            }
            if (accordions['is-2']) {
              gsap.to(accordions['is-2'], { width: '0%', duration: 0.1 });
              setBottomElementState(accordions['is-2'], '0');
            }
          }
        }
      },
      onEnter: () => {
        // Reset to first accordion when entering
        if (accordions['is-1']) {
          accordions['is-1'].classList.add('active');
          gsap.set(accordions['is-1'], { width: '100%' });
          setBottomElementState(accordions['is-1'], '100');
        }
        if (accordions['is-2']) {
          gsap.set(accordions['is-2'], { width: '0%' });
          setBottomElementState(accordions['is-2'], '0');
        }
        if (accordions['is-3']) {
          gsap.set(accordions['is-3'], { width: '0%' });
          setBottomElementState(accordions['is-3'], '0');
        }
      },
      onLeaveBack: () => {
        // Reset to first accordion when scrolling back up
        if (accordions['is-1']) {
          accordions['is-1'].classList.add('active');
          gsap.set(accordions['is-1'], { width: '100%' });
          setBottomElementState(accordions['is-1'], '100');
        }
        if (accordions['is-2']) {
          gsap.set(accordions['is-2'], { width: '0%' });
          setBottomElementState(accordions['is-2'], '0');
        }
        if (accordions['is-3']) {
          gsap.set(accordions['is-3'], { width: '0%' });
          setBottomElementState(accordions['is-3'], '0');
        }
      },
    },
  });

  tl.from(accordionSection, {
    duration: 1,
    ease: 'power2.out',
  });
}

/* 
! V1 - Sticky
*/
// export function accordionScrollTrigger(): void {
//   const accordionSection = document.querySelector('.section_home_h-accordion');

//   if (!accordionSection) return;

//   // Set initial active state to first accordion
//   const firstAccordion = document.querySelector('.home_h-accordion_horizontal-component.is-1');
//   if (firstAccordion) {
//     firstAccordion.classList.add('active');
//     const bottomElement = firstAccordion.querySelector('.home_h-accordion_horizontal-bottom');
//     if (bottomElement) {
//       bottomElement.classList.add('active');
//     }
//   }

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: '.section_home_h-accordion',
//       start: 'top 100%',
//       end: 'bottom 0%',
//       scrub: true,
//       markers: false,
//       onEnter: () => {
//         // Ensure first accordion is active when entering
//         const firstAccordion = document.querySelector(
//           '.home_h-accordion_horizontal-component.is-1'
//         );
//         if (firstAccordion) {
//           firstAccordion.classList.add('active');
//           const bottomElement = firstAccordion.querySelector('.home_h-accordion_horizontal-bottom');
//           if (bottomElement) {
//             bottomElement.classList.add('active');
//           }
//         }
//       },
//       onLeaveBack: () => {
//         // Reset to first accordion when scrolling back up
//         const accordionComponents = document.querySelectorAll(
//           '.home_h-accordion_horizontal-component'
//         );
//         accordionComponents.forEach((component) => {
//           component.classList.remove('active');
//           const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
//           if (bottomElement) {
//             bottomElement.classList.remove('active');
//           }
//         });

//         const firstAccordion = document.querySelector(
//           '.home_h-accordion_horizontal-component.is-1'
//         );
//         if (firstAccordion) {
//           firstAccordion.classList.add('active');
//           const bottomElement = firstAccordion.querySelector('.home_h-accordion_horizontal-bottom');
//           if (bottomElement) {
//             bottomElement.classList.add('active');
//           }
//         }
//       },
//       onUpdate: (self) => {
//         // Remove active class from all components
//         const accordionComponents = document.querySelectorAll(
//           '.home_h-accordion_horizontal-component'
//         );
//         accordionComponents.forEach((component) => {
//           component.classList.remove('active');
//           const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
//           if (bottomElement) {
//             bottomElement.classList.remove('active');
//           }
//         });

//         // Add active class based on scroll progress
//         let targetClass = '';
//         if (self.progress >= 0.5) {
//           targetClass = 'is-3';
//         } else if (self.progress >= 0.3) {
//           targetClass = 'is-2';
//         } else if (self.progress >= 0.2) {
//           targetClass = 'is-1';
//         }

//         if (targetClass) {
//           const targetComponent = document.querySelector(
//             `.home_h-accordion_horizontal-component.${targetClass}`
//           );
//           if (targetComponent) {
//             targetComponent.classList.add('active');
//             const bottomElement = targetComponent.querySelector(
//               '.home_h-accordion_horizontal-bottom'
//             );
//             if (bottomElement) {
//               bottomElement.classList.add('active');
//             }
//           }
//         } else {
//           // If no target class, ensure first accordion is active
//           const firstAccordion = document.querySelector(
//             '.home_h-accordion_horizontal-component.is-1'
//           );
//           if (firstAccordion) {
//             firstAccordion.classList.add('active');
//             const bottomElement = firstAccordion.querySelector(
//               '.home_h-accordion_horizontal-bottom'
//             );
//             if (bottomElement) {
//               bottomElement.classList.add('active');
//             }
//           }
//         }
//       },
//     },
//   });

//   tl.from(accordionSection, {
//     duration: 1,
//     ease: 'power2.out',
//   });
// }

/* 
! V0 - Clickable
*/
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
