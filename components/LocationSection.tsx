'use client';

import { motion } from 'framer-motion';
import { transitions, prefersReducedMotion } from '@/lib/motion';

export default function LocationSection() {
  return (
    <section id="location" className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transitions.smooth}
          >
            <motion.p
              className="text-sm font-semibold tracking-widest uppercase text-brand-600 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ...transitions.fast }}
            >
              Location
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold mb-6 text-brand-700 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ...transitions.smooth }}
            >
              FIND US
            </motion.h2>
          </motion.div>

          <motion.div
            className="bg-white/30 backdrop-blur-sm rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-8 sm:p-10 md:p-12 lg:p-16 border border-white/20 shadow-apple-lg"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ...transitions.slow }}
            whileHover={!prefersReducedMotion() ? { scale: 1.02, y: -4 } : {}}
          >
            <div className="text-center">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, ...transitions.spring }}
              >
                <motion.svg
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-brand-600 mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  animate={!prefersReducedMotion() ? {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </motion.svg>
              </motion.div>

              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-800 mb-6"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, ...transitions.spring }}
                whileHover={!prefersReducedMotion() ? { scale: 1.05 } : {}}
              >
                VA
              </motion.h3>

              <motion.div
                className="flex items-center justify-center gap-3 sm:gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, ...transitions.smooth }}
              >
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl font-medium text-brand-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65, ...transitions.spring }}
                  whileHover={!prefersReducedMotion() ? { scale: 1.05, x: 4 } : {}}
                >
                  Blacksburg
                </motion.p>
                <motion.span
                  className="text-brand-600 text-2xl"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={!prefersReducedMotion() ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    ...transitions.spring,
                    delay: 0.7,
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  •
                </motion.span>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl font-medium text-brand-700"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.75, ...transitions.spring }}
                  whileHover={!prefersReducedMotion() ? { scale: 1.05, x: -4 } : {}}
                >
                  Christiansburg
                </motion.p>
              </motion.div>

              <motion.p
                className="mt-8 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, ...transitions.smooth }}
              >
                Serving the New River Valley area with expert hair styling services.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

