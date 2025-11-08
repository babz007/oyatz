'use client';

import Link from 'next/link';

export default function HeroBlock() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
          OYATZ Salon
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-8 font-light">
          Where artistry meets expertise. Transform your look with our expert stylists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#download"
            className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Appointment
          </Link>
          <Link
            href="#gallery"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}

