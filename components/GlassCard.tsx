'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/40 border border-white/20 rounded-3xl shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 60px -12px rgba(164, 120, 100, 0.25)',
      }}
    >
      {children}
    </motion.div>
  );
}

