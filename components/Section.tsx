'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  shape?: 'none' | 'wave' | 'slanted' | 'asymmetric';
  variant?: 'default' | 'hover-lift';
}

export default function Section({
  id,
  children,
  className = '',
  shape = 'none',
  variant = 'default',
}: SectionProps) {
  const shapeClasses = {
    none: '',
    wave: 'shaped-section-wave',
    slanted: 'shaped-section-slanted',
    asymmetric: 'shaped-section-asymmetric',
  };

  const baseClasses = `section-padding ${shapeClasses[shape]} ${className}`;

  return (
    <motion.section
      id={id}
      className={baseClasses}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        variant === 'hover-lift'
          ? {
              y: -4,
              transition: { duration: 0.3 },
            }
          : undefined
      }
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

