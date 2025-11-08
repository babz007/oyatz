'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { prefersReducedMotion, transitions } from '@/lib/motion';

interface CTABandProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCTA: {
    label: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    label: string;
    onClick: () => void;
  };
  phoneNumber?: string;
}

export default function CTABand({
  id,
  eyebrow,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: CTABandProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 30, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const highlightX = useTransform(x, [0, 1], ['0%', '100%']);
  const highlightY = useTransform(y, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <section id={id} className="relative bg-brand-50/60 backdrop-blur-sm text-gray-900 overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
      <motion.div
        ref={cardRef}
        className="relative max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] backdrop-blur-[40px] bg-white/40 border border-white/30 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={transitions.slow}
        style={{
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        {/* Animated highlight */}
        {!prefersReducedMotion() && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(800px circle at ${highlightX} ${highlightY}, rgba(255, 255, 255, 0.4), transparent 70%)`,
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="relative z-10 text-center">
          {eyebrow && (
            <motion.p
              className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ...transitions.fast }}
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...transitions.smooth }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold mb-4 sm:mb-5 md:mb-6 text-brand-700 leading-[1.1] px-4 sm:px-0"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ...transitions.smooth }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, ...transitions.smooth }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
          >
            <MagneticButton
              onClick={primaryCTA.onClick}
              variant="primary"
            >
              {primaryCTA.label}
            </MagneticButton>
            {secondaryCTA && (
              <MagneticButton
                onClick={secondaryCTA.onClick}
                variant="secondary"
              >
                {secondaryCTA.label}
              </MagneticButton>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

