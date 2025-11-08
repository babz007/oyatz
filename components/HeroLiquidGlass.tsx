'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

interface HeroLiquidGlassProps {
  videoSrc?: string;
  fallbackImage?: string;
}

export default function HeroLiquidGlass({ videoSrc, fallbackImage }: HeroLiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Small blur overlay for hero section */}
      <div className="absolute inset-0 backdrop-blur-[3px] z-0" />
      
      {/* Gradient overlay for hero section */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-600/40 via-brand-500/30 to-brand-700/40 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Content - No box, just text overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-3 sm:mb-4 leading-[0.95] tracking-tight px-2 sm:px-0"
          >
            OYATZ
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-6 sm:mb-8 font-light tracking-[0.1em] sm:tracking-[0.15em] uppercase px-2 sm:px-0"
          >
            HAIR
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-8 sm:mb-10 md:mb-12 font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 sm:px-6 md:px-0"
          >
            Where artistry meets expertise. Transform your look with me.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.1,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
          >
            <MagneticButton href="#download" variant="glass">
              Book Appointment
            </MagneticButton>
            <MagneticButton href="#gallery" variant="secondary">
              View Our Work
            </MagneticButton>
          </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          delay: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase flex flex-col items-center gap-3 pointer-events-none"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

