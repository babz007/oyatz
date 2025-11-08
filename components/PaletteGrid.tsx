'use client';

import { motion } from 'framer-motion';
import { ColorToken } from '@/lib/palette';
import ColorSwatch from './ColorSwatch';
import Reveal from './Reveal';

interface PaletteGridProps {
  colors: ColorToken[];
  title?: string;
  showContrast?: boolean;
}

export default function PaletteGrid({
  colors,
  title,
  showContrast = true,
}: PaletteGridProps) {
  return (
    <div>
      {title && (
        <Reveal>
          <h3 className="text-2xl font-display font-bold mb-8">{title}</h3>
        </Reveal>
      )}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {colors.map((color, index) => (
          <Reveal key={color.name} delay={index * 0.1}>
            <ColorSwatch color={color} showContrast={showContrast} />
          </Reveal>
        ))}
      </motion.div>
    </div>
  );
}

