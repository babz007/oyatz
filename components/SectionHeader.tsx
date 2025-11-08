'use client';

import { motion } from 'framer-motion';
import { fadeInUp, transitions } from '@/lib/motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24 px-4 sm:px-0 ${className}`}
      {...fadeInUp}
      transition={transitions.slow}
    >
      {eyebrow && (
        <motion.p
          className="text-sm font-semibold tracking-widest uppercase text-brand-500 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ...transitions.fast }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold mb-4 sm:mb-5 md:mb-6 text-brand-600 tracking-tight leading-[1.1]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, ...transitions.smooth }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ...transitions.smooth }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}



