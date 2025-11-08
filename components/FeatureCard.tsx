'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { prefersReducedMotion, transitions } from '@/lib/motion';

interface FeatureCardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  index?: number;
  icon?: ReactNode;
}

export default function FeatureCard({
  title,
  description,
  image,
  imageAlt,
  index = 0,
  icon,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 30, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [0, 1], prefersReducedMotion() ? [0, 0] : [2, -2]);
  const rotateY = useTransform(x, [0, 1], prefersReducedMotion() ? [0, 0] : [-2, 2]);
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
      className="group relative overflow-hidden rounded-[24px] bg-white/50 backdrop-blur-sm shadow-apple-lg border border-white/20"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        ...transitions.smooth,
        delay: index * 0.1,
      }}
      whileHover={
        !prefersReducedMotion()
          ? {
              y: -12,
              scale: 1.02,
              boxShadow: '0 32px 80px -16px rgba(164, 120, 100, 0.3)',
            }
          : {}
      }
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      transition={transitions.spring}
    >
      {/* Liquid glass highlight */}
      {!prefersReducedMotion() && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(600px circle at ${highlightX} ${highlightY}, rgba(255, 255, 255, 0.2), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Image */}
      {image && (
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={!prefersReducedMotion() ? { scale: 1.1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={image}
              alt={imageAlt || title}
              width={600}
              height={400}
              className="w-full h-full object-cover"
              unoptimized
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Icon */}
      {icon && !image && (
        <div className="relative h-32 flex items-center justify-center bg-brand-50">
          <div className="text-6xl">{icon}</div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6 md:p-8">
        <motion.h3
          className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-display font-bold text-brand-600 mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, ...transitions.fast }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm sm:text-base md:text-base text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, ...transitions.fast }}
        >
          {description}
        </motion.p>
      </div>

      {/* Border glow on hover */}
      {!prefersReducedMotion() && (
        <motion.div
          className="absolute inset-0 rounded-[24px] pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? 'inset 0 0 0 1px rgba(164, 120, 100, 0.3), inset 0 0 60px rgba(164, 120, 100, 0.1)'
              : 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}



