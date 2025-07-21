/**
 * Initialize localization functionality for language switching
 */
export function initLocalization() {
  // Function to update active language state
  const updateActiveLanguage = () => {
    const currentLanguage = getCurrentLanguage();
    const dropdownRows = document.querySelectorAll('.navbar_dropdown-list-row');

    dropdownRows.forEach((row) => {
      const rowText = row.textContent?.trim().toLowerCase();

      // Remove w--current class from all items first
      row.classList.remove('w--current');

      // Add w--current class to the matching language
      if (currentLanguage === 'fr' && rowText === 'fr') {
        row.classList.add('w--current');
      } else if (currentLanguage === 'en' && rowText === 'en') {
        row.classList.add('w--current');
      }
    });
  };

  // Function to handle language switching
  const handleLanguageSwitch = (event: Event) => {
    const target = event.target as HTMLElement;
    const listRow = target.closest('.navbar_dropdown-list-row') as HTMLElement;

    if (!listRow) return;

    // Get the text content of the clicked element
    const languageText = listRow.textContent?.trim().toLowerCase();

    if (!languageText) return;

    // Get current URL
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    let newPath = url.pathname;

    // Handle language switching logic
    if (languageText === 'fr') {
      // If French is selected, change /en to /fr or /en/ to /fr/
      if (newPath === '/en') {
        newPath = '/fr';
      } else if (newPath.startsWith('/en/')) {
        newPath = newPath.replace('/en/', '/fr/');
      }
    } else if (languageText === 'en') {
      // If English is selected, change /fr to /en or /fr/ to /en/
      if (newPath === '/fr') {
        newPath = '/en';
      } else if (newPath.startsWith('/fr/')) {
        newPath = newPath.replace('/fr/', '/en/');
      }
    }

    // Only navigate if the path actually changed
    if (newPath !== url.pathname) {
      const newUrl = `${url.protocol}//${url.host}${newPath}${url.search}${url.hash}`;
      window.location.href = newUrl;
    }
  };

  // Add event listener to handle clicks on language dropdown items
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const dropdownRow = target.closest('.navbar_dropdown-list-row');

    if (dropdownRow) {
      handleLanguageSwitch(event);
    }
  });

  // Initialize active language state on load
  updateActiveLanguage();
}

/**
 * Get current language from URL
 * @returns 'fr' | 'en' | null
 */
export function getCurrentLanguage(): 'fr' | 'en' | null {
  const currentPath = window.location.pathname;

  if (currentPath === '/fr' || currentPath.startsWith('/fr/')) {
    return 'fr';
  }
  if (currentPath === '/en' || currentPath.startsWith('/en/')) {
    return 'en';
  }

  return null;
}

/**
 * Switch to a specific language
 * @param targetLanguage - The language to switch to ('fr' | 'en')
 */
export function switchToLanguage(targetLanguage: 'fr' | 'en') {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  let newPath = url.pathname;

  if (targetLanguage === 'fr') {
    if (newPath === '/en') {
      newPath = '/fr';
    } else if (newPath.startsWith('/en/')) {
      newPath = newPath.replace('/en/', '/fr/');
    }
  } else if (targetLanguage === 'en') {
    if (newPath === '/fr') {
      newPath = '/en';
    } else if (newPath.startsWith('/fr/')) {
      newPath = newPath.replace('/fr/', '/en/');
    }
  }

  if (newPath !== url.pathname) {
    const newUrl = `${url.protocol}//${url.host}${newPath}${url.search}${url.hash}`;
    window.location.href = newUrl;
  }
}
