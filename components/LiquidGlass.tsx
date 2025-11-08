'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface LiquidGlassProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function LiquidGlass({
  children,
  className = '',
  intensity = 1,
}: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(useTransform(mouseX, (v) => v * intensity), springConfig);
  const y = useSpring(useTransform(mouseY, (v) => v * intensity), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normalizedX = ((e.clientX - centerX) / rect.width) * 100;
      const normalizedY = ((e.clientY - centerY) / rect.height) * 100;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
      setMousePosition({ x: 50 + normalizedX, y: 50 + normalizedY });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        setMousePosition({ x: 50, y: 50 });
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        x,
        y,
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, rgba(164, 120, 100, 0.3), transparent 50%)`,
            `radial-gradient(circle at 80% 50%, rgba(171, 103, 87, 0.3), transparent 50%)`,
            `radial-gradient(circle at 50% 20%, rgba(141, 99, 83, 0.3), transparent 50%)`,
            `radial-gradient(circle at 20% 50%, rgba(164, 120, 100, 0.3), transparent 50%)`,
          ],
          backgroundSize: ['150% 150%', '200% 200%', '180% 180%', '150% 150%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Liquid glass overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1), transparent 40%)`,
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
        animate={{
          background: [
            `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1), transparent 40%)`,
            `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.15), transparent 50%)`,
            `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1), transparent 40%)`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

