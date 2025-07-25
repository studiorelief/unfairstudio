import gsap from 'gsap';

export function heroTextSwitch() {
  const textElement = document.querySelector('.hero_text-switch') as HTMLElement;

  if (!textElement) {
    return;
  }

  const texts = ['agents', 'copilots', 'chatbots', 'campaigns', 'MVPs'];
  let currentIndex = 0;

  // Function to measure text width
  const measureTextWidth = (text: string): number => {
    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.whiteSpace = 'nowrap';

    // Copy computed styles from the original element
    const computedStyle = window.getComputedStyle(textElement);
    tempElement.style.font = computedStyle.font;
    tempElement.style.fontSize = computedStyle.fontSize;
    tempElement.style.fontFamily = computedStyle.fontFamily;
    tempElement.style.fontWeight = computedStyle.fontWeight;
    tempElement.style.letterSpacing = computedStyle.letterSpacing;

    tempElement.textContent = text;
    document.body.appendChild(tempElement);

    const width = tempElement.offsetWidth;
    document.body.removeChild(tempElement);

    return width;
  };

  // Set initial text and calculate max width
  textElement.textContent = texts[currentIndex];
  const maxWidth = Math.max(...texts.map((text) => measureTextWidth(text)));
  textElement.style.width = `${maxWidth}px`;
  if (window.innerWidth <= 768) {
    textElement.style.textAlign = 'center';
  } else {
    textElement.style.textAlign = 'left';
  }

  const switchText = () => {
    // Get next text
    const nextIndex = (currentIndex + 1) % texts.length;

    // Animation de sortie (fade out + scale + move left)
    gsap.to(textElement, {
      opacity: 0,
      scale: 0.8,
      x: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        // Changer le texte
        currentIndex = nextIndex;
        textElement.textContent = texts[currentIndex];

        // Animation d'entrée (fade in + scale + move from right)
        gsap.fromTo(
          textElement,
          {
            opacity: 0,
            scale: 1,
            x: 100,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
          }
        );
      },
    });
  };

  // Démarrer l'animation en boucle (changement toutes les 2 secondes)
  const interval = setInterval(switchText, 4000);

  // Nettoyer l'intervalle si l'élément est supprimé du DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node.contains && node.contains(textElement)) {
          clearInterval(interval);
          observer.disconnect();
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return {
    destroy: () => {
      clearInterval(interval);
      observer.disconnect();
    },
  };
}
