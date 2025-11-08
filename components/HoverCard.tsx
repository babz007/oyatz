'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
}

export default function HoverCard({
  children,
  className = '',
  image,
  imageAlt,
}: HoverCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl ${className}`}
      style={{ backgroundColor: className.includes('transparent') ? 'transparent' : undefined }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: '0 20px 60px -12px rgba(164, 120, 100, 0.25)',
      }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {image && (
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            whileHover={{ scale: 1.15 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      <motion.div
        className="p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

