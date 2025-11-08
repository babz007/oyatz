'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { prefersReducedMotion, transitions } from '@/lib/motion';

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  blur?: number;
}

export default function LiquidGlassCard({
  children,
  className = '',
  intensity = 0.3,
  blur = 40,
}: LiquidGlassCardProps) {
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
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-[24px] backdrop-blur-[40px] bg-white/70 border border-white/30 shadow-apple-lg ${className}`}
      style={{
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={transitions.smooth}
      whileHover={!prefersReducedMotion() ? { scale: 1.02, y: -4 } : {}}
      transition={transitions.spring}
    >
      {/* Animated highlight */}
      {!prefersReducedMotion() && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${highlightX} ${highlightY}, rgba(255, 255, 255, 0.3), transparent 70%)`,
            opacity: isHovered ? 1 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}



