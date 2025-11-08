/**
 * Motion presets for consistent animations
 * Respects prefers-reduced-motion
 */

import { MotionProps, Transition } from 'framer-motion';

// Reduced motion check
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Easing curves (Apple standard)
export const easings = {
  default: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeIn: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number],
};

// Transition presets
export const transitions = {
  smooth: {
    duration: prefersReducedMotion() ? 0.01 : 0.6,
    ease: easings.default,
  } as Transition,
  slow: {
    duration: prefersReducedMotion() ? 0.01 : 0.8,
    ease: easings.default,
  } as Transition,
  fast: {
    duration: prefersReducedMotion() ? 0.01 : 0.4,
    ease: easings.default,
  } as Transition,
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  } as Transition,
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  } as Transition,
};

// Animation variants
export const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: prefersReducedMotion() ? 0 : 30 },
  animate: { opacity: 1, y: 0 },
  transition: transitions.smooth,
};

export const fadeIn: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: transitions.fast,
};

export const scaleIn: MotionProps = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: transitions.spring,
};

export const staggerContainer: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion() ? 0 : 0.1,
      },
    },
  },
};

export const staggerItem: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: prefersReducedMotion() ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.smooth,
    },
  },
};



