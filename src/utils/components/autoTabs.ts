export function autoTabs() {
  const tabs = document.querySelectorAll('.home_tabs_link') as NodeListOf<HTMLElement>;
  const panes = document.querySelectorAll('.home_tabs_pane') as NodeListOf<HTMLElement>;
  let currentIndex = 0;
  let intervalId: number | undefined;

  function activateTab(index: number) {
    tabs.forEach((tab, idx) => {
      if (idx === index) {
        tab.classList.add('w--current');
      } else {
        tab.classList.remove('w--current');
      }
    });

    panes.forEach((pane, idx) => {
      if (idx === index) {
        pane.classList.add('w--tab-active');
      } else {
        pane.classList.remove('w--tab-active');
      }
    });
  }

  function animateLine() {
    tabs.forEach((tab) => {
      const line = tab.querySelector('.home_tabs_load') as HTMLElement | null;
      if (line) {
        line.style.transition = 'none';
        line.style.width = '0%';
      }
    });

    const currentTab = tabs[currentIndex];
    const line = currentTab.querySelector('.home_tabs_load') as HTMLElement | null;
    if (line) {
      setTimeout(() => {
        if (line) {
          line.style.transition = 'width 4s linear';
          line.style.width = '100%';
        }
      }, 50);
    }
  }

  function changeTab() {
    activateTab(currentIndex);
    animateLine();
    currentIndex = (currentIndex + 1) % tabs.length;
  }

  function resetAnimation(index: number) {
    currentIndex = index;
    clearInterval(intervalId);
    setTimeout(() => {
      changeTab();
      intervalId = setInterval(changeTab, 4000);
    }, 50);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => resetAnimation(index));
  });

  intervalId = setInterval(changeTab, 4000);
  changeTab();
}
