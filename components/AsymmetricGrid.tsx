'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface GridItem {
  id: string;
  content: ReactNode;
  span?: {
    cols?: number;
    rows?: number;
  };
  className?: string;
}

interface AsymmetricGridProps {
  items: GridItem[];
  className?: string;
}

export default function AsymmetricGrid({
  items,
  className = '',
}: AsymmetricGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr ${className}`}>
      {items.map((item, index) => {
        const isHovered = hoveredId === item.id;
        const cols = item.span?.cols || 1;
        const rows = item.span?.rows || 1;

        // Dynamic grid span classes
        const colSpanClass = cols > 1 ? `md:col-span-${cols}` : '';
        const rowSpanClass = rows > 1 ? `md:row-span-${rows}` : '';

        return (
          <motion.div
            key={item.id}
            className={`relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all ${item.className || ''}`}
            style={{
              gridColumn: cols > 1 ? `span ${cols}` : 'auto',
              gridRow: rows > 1 ? `span ${rows}` : 'auto',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{
              y: -12,
              scale: 1.02,
              boxShadow: '0 25px 60px -12px rgba(164, 120, 100, 0.3)',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.6,
              delay: index * 0.1,
            }}
          >
            {/* Liquid glass effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 pointer-events-none"
              animate={{
                opacity: isHovered ? 0.1 : 0,
                background: isHovered
                  ? `radial-gradient(circle at 50% 50%, rgba(164, 120, 100, 0.2), transparent 70%)`
                  : 'transparent',
              }}
              transition={{ duration: 0.4 }}
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8">{item.content}</div>

            {/* Border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: isHovered
                  ? '0 0 0 1px rgba(164, 120, 100, 0.3), inset 0 0 40px rgba(164, 120, 100, 0.1)'
                  : '0 0 0 1px rgba(0, 0, 0, 0.05)',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

