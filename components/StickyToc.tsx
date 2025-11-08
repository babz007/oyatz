'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'download', label: 'Book' },
  { id: 'faq', label: 'FAQ' },
];

export default function StickyToc() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40"
      aria-label="Table of contents"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <ul className="space-y-3">
        {sections.map(({ id, label }, index) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <motion.button
              onClick={() => scrollToSection(id)}
              className={`group flex items-center gap-3 text-sm transition-colors ${
                activeSection === id
                  ? 'text-brand-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-current={activeSection === id ? 'location' : undefined}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className={`rounded-full ${
                  activeSection === id
                    ? 'bg-brand-600'
                    : 'bg-gray-300 group-hover:bg-gray-400'
                }`}
                animate={{
                  width: activeSection === id ? 8 : 6,
                  height: activeSection === id ? 8 : 6,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-hidden="true"
              />
              {label}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}

