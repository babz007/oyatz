'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ShapedContainerProps {
  children: ReactNode;
  shape?: 'wave' | 'slanted' | 'curved' | 'asymmetric';
  className?: string;
  variant?: 'default' | 'hover-lift' | 'liquid-glass';
}

export default function ShapedContainer({
  children,
  shape = 'wave',
  className = '',
  variant = 'default',
}: ShapedContainerProps) {
  const shapeStyles = {
    wave: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)',
    },
    slanted: {
      clipPath: 'polygon(0% 0%, 100% 5%, 100% 95%, 0% 100%)',
    },
    curved: {
      borderRadius: '2rem 0 2rem 0',
    },
    asymmetric: {
      clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 95% 100%, 5% 100%, 0% 90%)',
    },
  };

  const baseClasses = 'relative overflow-hidden bg-white shadow-xl';
  const hoverClasses =
    variant === 'hover-lift'
      ? 'hover:shadow-2xl transition-all duration-500'
      : variant === 'liquid-glass'
      ? 'hover:shadow-2xl'
      : '';

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      style={shapeStyles[shape]}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        variant === 'hover-lift'
          ? {
              y: -8,
              scale: 1.01,
              boxShadow: '0 25px 60px -12px rgba(164, 120, 100, 0.25)',
            }
          : variant === 'liquid-glass'
          ? {
              scale: 1.02,
              boxShadow: '0 30px 70px -15px rgba(164, 120, 100, 0.3)',
            }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.8,
      }}
    >
      {variant === 'liquid-glass' && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(164, 120, 100, 0.15), transparent 70%)`,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

