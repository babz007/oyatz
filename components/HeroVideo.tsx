'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroVideoProps {
  videoSrc?: string;
  fallbackImage?: string;
}

export default function HeroVideo({ videoSrc, fallbackImage }: HeroVideoProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Hair braiding in action"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : fallbackImage ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
          aria-label="Hair salon hero background"
        />
      ) : null}
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-500/70 via-brand-400/60 to-brand-600/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-4 leading-[0.9] tracking-tight"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block"
          >
            OYATZ
          </motion.span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-2xl md:text-4xl text-white/90 mb-12 font-light tracking-[0.2em] uppercase"
        >
          SALON
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-lg md:text-xl text-white/95 mb-16 font-light max-w-2xl leading-relaxed"
        >
          Where artistry meets expertise. Transform your look with our expert stylists.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.8,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
          >
            <Link
              href="#download"
              className="px-10 py-4 bg-white text-brand-600 font-semibold rounded-full shadow-2xl hover:shadow-glow-lg transition-all duration-300 block"
            >
              Book Appointment
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
          >
            <Link
              href="#gallery"
              className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 block glass-dark"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-12 text-white/80 text-sm tracking-widest uppercase flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}

