'use client';

import { useEffect, useRef } from 'react';

interface TextMarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  opacity?: number;
}

export default function TextMarquee({
  text,
  direction = 'left',
  speed = 1,
  className = '',
  opacity = 0.2,
}: TextMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Clear and recreate content
    content.innerHTML = '';

    // Create enough copies to fill screen width multiple times
    // We'll create copies dynamically based on viewport width
    const createCopies = () => {
      content.innerHTML = '';
      const viewportWidth = window.innerWidth;
      const tempSpan = document.createElement('span');
      tempSpan.className = 'marquee-item inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-bold px-4 sm:px-6 md:px-8 select-none';
      tempSpan.textContent = text;
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      content.appendChild(tempSpan);
      
      const itemWidth = tempSpan.offsetWidth;
      const copiesNeeded = Math.ceil((viewportWidth * 3) / itemWidth) + 4; // 3x viewport + buffer
      
      content.innerHTML = '';
      
      for (let i = 0; i < copiesNeeded; i++) {
        const span = document.createElement('span');
        span.className = 'marquee-item inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-bold px-4 sm:px-6 md:px-8 select-none';
        span.style.color = `rgba(164, 120, 100, ${opacity})`;
        span.textContent = text;
        content.appendChild(span);
      }
      
      return itemWidth;
    };

    const itemWidth = createCopies();
    if (itemWidth === 0) return;

    // Handle resize to recreate copies if needed
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createCopies();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    let position = 0;
    const animate = () => {
      if (direction === 'left') {
        position += speed;
        // Reset when we've scrolled one item width
        if (position >= itemWidth) {
          position = position - itemWidth;
        }
        content.style.transform = `translateX(-${position}px)`;
      } else {
        position -= speed;
        // Reset when we've scrolled one item width backwards
        if (position <= -itemWidth) {
          position = position + itemWidth;
        }
        content.style.transform = `translateX(${position}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [text, direction, speed, opacity]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
      aria-hidden="true"
    >
      <div
        ref={contentRef}
        className="flex"
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  );
}

