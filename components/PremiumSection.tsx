'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PremiumSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  background?: 'white' | 'brand-50' | 'gradient';
}

export default function PremiumSection({
  id,
  children,
  className = '',
  title,
  subtitle,
  background = 'white',
}: PremiumSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    'brand-50': 'bg-brand-50',
    gradient: 'bg-gradient-to-br from-brand-50 to-white',
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {title && (
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-brand-600 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}

