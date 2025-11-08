'use client';

import { motion } from 'framer-motion';
import { ColorToken } from '@/lib/palette';

interface GradientRibbonProps {
  colors: ColorToken[];
  direction?: 'horizontal' | 'vertical';
  height?: string;
}

export default function GradientRibbon({
  colors,
  direction = 'horizontal',
  height = 'h-24',
}: GradientRibbonProps) {
  const gradientStops = colors
    .map((color, index) => `${color.hex} ${(index / (colors.length - 1)) * 100}%`)
    .join(', ');

  const gradientDirection =
    direction === 'horizontal' ? 'to right' : 'to bottom';

  return (
    <motion.div
      className={`w-full ${height} rounded-2xl shadow-xl overflow-hidden relative`}
      aria-label={`Gradient ribbon with ${colors.length} colors`}
      role="img"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          background: `linear-gradient(90deg, ${colors
            .map((c) => c.hex)
            .join(', ')}, ${colors
            .map((c) => c.hex)
            .join(', ')})`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0%', '100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

