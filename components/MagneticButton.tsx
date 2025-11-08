'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      if (!ref.current || !isHovered) return;
      const mouseEvent = e as MouseEvent;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = mouseEvent.clientX - centerX;
      const distanceY = mouseEvent.clientY - centerY;
      x.set(distanceX * 0.15);
      y.set(distanceY * 0.15);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mouseenter', () => setIsHovered(true));
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [x, y, isHovered]);

  const variants = {
    primary: 'px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg bg-white text-brand-600 font-semibold rounded-full shadow-2xl hover:shadow-[0_25px_60px_-12px_rgba(164,120,100,0.4)] transition-shadow min-h-[44px] sm:min-h-[48px] md:min-h-[52px]',
    secondary: 'px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all glass-dark min-h-[44px] sm:min-h-[48px] md:min-h-[52px]',
    glass: 'px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg bg-white/70 backdrop-blur-xl border border-white/50 text-brand-600 font-semibold rounded-full shadow-xl hover:bg-white/90 transition-all min-h-[44px] sm:min-h-[48px] md:min-h-[52px]',
  };

  const baseProps = {
    ref,
    className: `${variants[variant]} ${className}`,
    style: {
      x: xSpring,
      y: ySpring,
    },
    whileHover: {
      scale: 1.05,
      y: -2,
    },
    whileTap: {
      scale: 0.98,
    },
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17,
    },
  };

  if (href) {
    return (
      <motion.a href={href} {...baseProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...baseProps}>
      {children}
    </motion.button>
  );
}

