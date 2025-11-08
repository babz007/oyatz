'use client';

import { ReactNode } from 'react';

interface ShapedSectionProps {
  children: ReactNode;
  className?: string;
  shape?: 'wave' | 'blob' | 'angled';
  direction?: 'up' | 'down';
}

export default function ShapedSection({
  children,
  className = '',
  shape = 'wave',
  direction = 'down',
}: ShapedSectionProps) {
  const shapeStyles = {
    wave: direction === 'down'
      ? 'path("M0,0 Q250,100 500,0 T1000,0 L1000,100 L0,100 Z")'
      : 'path("M0,100 Q250,0 500,100 T1000,100 L1000,0 L0,0 Z")',
    blob: direction === 'down'
      ? 'path("M0,0 C150,80 350,40 500,0 C650,40 850,80 1000,0 L1000,100 L0,100 Z")'
      : 'path("M0,100 C150,20 350,60 500,100 C650,60 850,20 1000,100 L1000,0 L0,0 Z")',
    angled: direction === 'down'
      ? 'polygon(0 0, 100% 10%, 100% 100%, 0 100%)'
      : 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden -z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          style={{
            clipPath: shapeStyles[shape],
            fill: 'currentColor',
          }}
        >
          <rect width="1000" height="100" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
}

