'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <nav className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="text-xl sm:text-2xl md:text-2xl font-display font-bold text-brand-700 hover:text-brand-800 transition-colors"
            >
              OYATZ
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              { href: '#story', label: 'About' },
              { href: '#gallery', label: 'Gallery' },
              { href: '#download', label: 'Book Appointment' },
              { href: '#faq', label: 'FAQ' },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors relative group"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

