'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  background?: 'white' | 'brand-50' | 'gradient' | 'yellowish-brown';
  maxWidth?: 'default' | 'narrow' | 'wide';
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  background = 'white',
  maxWidth = 'default',
  className = '',
}: SectionWrapperProps) {
  const bgClasses = {
    white: 'bg-white/80 backdrop-blur-sm',
    'brand-50': 'bg-brand-50/60 backdrop-blur-sm',
    gradient: 'bg-gradient-to-br from-brand-50/60 to-white/80 backdrop-blur-sm',
    'yellowish-brown': 'bg-transparent',
  };

  const maxWidthClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1400px]',
  };

  return (
    <motion.section
      id={id}
      className={`relative ${bgClasses[background]} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className={`container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40`}>
        <div className={maxWidthClasses[maxWidth] + ' mx-auto'}>
          {children}
        </div>
      </div>
    </motion.section>
  );
}



