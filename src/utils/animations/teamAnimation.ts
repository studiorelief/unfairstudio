import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register the MotionPath plugin
gsap.registerPlugin(MotionPathPlugin);

export function teamAnimation(): void {
  // Animation configuration for each planet
  const planetConfig = [
    { selector: '.hero_planete-dot.is-1', path: '#planete-1', duration: 30, spacing: 0.3 },
    { selector: '.hero_planete-dot.is-2', path: '#planete-2', duration: 20, spacing: 0.33 },
    { selector: '.hero_planete-dot.is-3', path: '#planete-3', duration: 10, spacing: 0.4 },
  ];

  // Apply animations for each planet configuration
  planetConfig.forEach((config) => {
    const dots = document.querySelectorAll(config.selector);

    dots.forEach((dot, index) => {
      gsap.to(dot, {
        motionPath: {
          path: config.path,
          align: config.path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: index * config.spacing, // Distribute dots evenly
        },
        duration: config.duration,
        repeat: -1,
        ease: 'linear',
      });
    });
  });
}
