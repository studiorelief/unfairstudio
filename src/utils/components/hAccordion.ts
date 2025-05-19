export function initAccordion(): void {
  const accordionComponents = document.querySelectorAll('.home_h-accordion_horizontal-component');

  accordionComponents.forEach((component) => {
    component.addEventListener('click', () => {
      // Remove active class from all previously active elements
      const activeElements = document.querySelectorAll('.active');
      activeElements.forEach((element) => element.classList.remove('active'));

      // Add active class to clicked component
      component.classList.add('active');

      // Add active class to bottom element within component
      const bottomElement = component.querySelector('.home_h-accordion_horizontal-bottom');
      if (bottomElement) {
        bottomElement.classList.add('active');
      }
    });
  });
}
