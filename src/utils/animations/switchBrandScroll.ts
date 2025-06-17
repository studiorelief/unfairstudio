import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function createSectionAnimation(
  section: Element,
  headingTags: NodeListOf<Element>,
  headingDots: NodeListOf<Element>,
  darkmodeDivider: NodeListOf<Element>
) {
  gsap.fromTo(
    [section, darkmodeDivider as unknown as HTMLElement],
    {
      color: 'white',
      backgroundColor: '#131313',
    },
    {
      scrollTrigger: {
        trigger: section,
        start: '-16 50%',
        end: '50% 50%',
        scrub: true,
        markers: false,
      },
      backgroundColor: '#f5f5f5',
      color: 'black',
      ease: 'none',
    }
  );

  gsap.fromTo(
    headingTags,
    {
      color: 'yellow',
    },
    {
      scrollTrigger: {
        trigger: section,
        start: '0% 50%',
        end: '50% 50%',
        scrub: true,
      },
      color: '#1500ff',
      ease: 'none',
    }
  );

  gsap.fromTo(
    headingDots,
    {
      color: 'yellow',
    },
    {
      scrollTrigger: {
        trigger: section,
        start: '0% 50%',
        end: '50% 50%',
        scrub: true,
      },
      color: '#1500ff',
      ease: 'none',
    }
  );
}

export function initColorScrollHome() {
  const homeSection = document.querySelector('.section_home_baseline');
  const headingTags = document.querySelectorAll('.heading-tag');
  const headingDots = document.querySelectorAll('.heading-dot');
  const darkmodeDivider = document.querySelectorAll('.darkmode-divider.is-scroll');

  if (homeSection) {
    createSectionAnimation(homeSection, headingTags, headingDots, darkmodeDivider);
  }
}

export function initColorScrollSolutions() {
  const solutionsSection = document.querySelector('.section_solutions_tools');
  const headingTags = document.querySelectorAll('.heading-tag');
  const headingDots = document.querySelectorAll('.heading-dot');
  const darkmodeDivider = document.querySelectorAll('.darkmode-divider.is-scroll');

  if (solutionsSection) {
    createSectionAnimation(solutionsSection, headingTags, headingDots, darkmodeDivider);
  }
}

export function initColorScrollTeam() {
  const teamSection = document.querySelector('.section_team_baseline');
  const headingTags = document.querySelectorAll('.heading-tag');
  const headingDots = document.querySelectorAll('.heading-dot');
  const darkmodeDivider = document.querySelectorAll('.darkmode-divider.is-scroll');

  if (teamSection) {
    createSectionAnimation(teamSection, headingTags, headingDots, darkmodeDivider);
  }
}
