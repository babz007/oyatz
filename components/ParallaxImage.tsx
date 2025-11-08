'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
}: ParallaxImageProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const elementTop = rect.top + scrollY;
        const elementCenter = elementTop + rect.height / 2;
        const windowCenter = window.innerHeight / 2 + scrollY;
        const distance = elementCenter - windowCenter;
        setOffset(distance * speed * 0.01);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-3xl ${className}`}>
      <motion.div
        style={{ transform: `translateY(${offset}px)` }}
        className="transition-transform duration-300 ease-out"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto"
          unoptimized
        />
      </motion.div>
    </div>
  );
}

