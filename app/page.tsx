'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import HeroBlock from '@/components/HeroBlock';
import HeroVideo from '@/components/HeroVideo';
import HeroLiquidGlass from '@/components/HeroLiquidGlass';
import MasonryGallery from '@/components/MasonryGallery';
import Accordion from '@/components/Accordion';
import Footer from '@/components/Footer';
import TextMarquee from '@/components/TextMarquee';
import HoverCard from '@/components/HoverCard';
import GlassCard from '@/components/GlassCard';
import SmoothReveal from '@/components/SmoothReveal';
import ParallaxImage from '@/components/ParallaxImage';
import LiquidGlass from '@/components/LiquidGlass';
import ShapedContainer from '@/components/ShapedContainer';
import MagneticButton from '@/components/MagneticButton';
import PremiumCard from '@/components/PremiumCard';
import PremiumSection from '@/components/PremiumSection';
import PremiumBookingCard from '@/components/PremiumBookingCard';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import CTABand from '@/components/CTABand';
import LocationSection from '@/components/LocationSection';
import { generateColorTokensJSON } from '@/lib/palette';
import { story, gallery, booking, faq } from '@/lib/copy';

// Gallery images using downloaded Pexels assets
const galleryImages = [
  {
    id: '1',
    src: '/assets/pexels-davdkuko-27738675.jpg',
    alt: 'Beautiful braids hairstyle portrait',
    width: 5461,
    height: 8192,
    type: 'image' as const,
  },
  {
    id: '2',
    src: '/assets/pexels-jagaba-34497708.jpg',
    alt: 'Natural hair styling portrait',
    width: 4016,
    height: 6016,
    type: 'image' as const,
  },
  {
    id: '3',
    src: '/assets/pexels-taiyesalawu-34467419.jpg',
    alt: 'Professional hair styling portrait',
    width: 3000,
    height: 4500,
    type: 'image' as const,
  },
  {
    id: '4',
    src: '/assets/pexels-ekaterina-bolovtsova-5957103.jpg',
    alt: 'Elegant hairstyle portrait',
    width: 3648,
    height: 5472,
    type: 'image' as const,
  },
  {
    id: '5',
    src: '/assets/pexels-fannythegrapher1-10013308.jpg',
    alt: 'Stylish hair portrait showcasing natural texture',
    width: 2000,
    height: 3000,
    type: 'image' as const,
  },
  {
    id: '6',
    src: '/assets/pexels-cottonbro-5052869.jpg',
    alt: 'Professional salon styling work',
    width: 6240,
    height: 4160,
    type: 'image' as const,
  },
  {
    id: '7',
    src: '/assets/pexels-lenita-tropical-712209736-18961505.jpg',
    alt: 'Natural hair model portrait',
    width: 4000,
    height: 6000,
    type: 'image' as const,
  },
  {
    id: '8',
    src: '/assets/pexels-wundef-15896203.jpg',
    alt: 'Professional hair styling in salon',
    width: 4000,
    height: 6000,
    type: 'image' as const,
  },
];


export default function Home() {
  const [basePath, setBasePath] = useState('');
  const videoPath = basePath ? `${basePath}/assets/7507183-hd_1920_1080_25fps.mp4` : '/assets/7507183-hd_1920_1080_25fps.mp4';

  useEffect(() => {
    // Detect basePath from current location
    const pathname = window.location.pathname;
    if (pathname.startsWith('/oyatz')) {
      setBasePath('/oyatz');
    }
  }, []);

  // Update gallery images with basePath
  const galleryImagesWithBasePath = galleryImages.map(img => ({
    ...img,
    src: basePath ? `${basePath}${img.src}` : img.src,
  }));

  const handleDownload = () => {
    const json = generateColorTokensJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oyatz-color-tokens-2025.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="relative">
      {/* Fixed video background for entire site */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Hair braiding background video"
        >
          <source src={videoPath} type="video/mp4" />
        </video>
        {/* Subtle overlay for content readability */}
        <div className="absolute inset-0 bg-brand-50/40 backdrop-blur-[1px]" />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <Header />

        {/* Hero Section - Apple-Level Liquid Glass */}
        <section id="hero">
          <HeroLiquidGlass videoSrc={videoPath} />
        </section>

      {/* Text Marquee Divider */}
      <div className="py-6 sm:py-8 md:py-10 bg-brand-50/30 backdrop-blur-sm overflow-hidden">
        <TextMarquee text="Braids • Twists • Locs • Weaving • Retwisting • Colored Braids • Natural Hair • Styling • Extensions • Consultations" direction="right" speed={2} opacity={0.2} />
      </div>

      {/* Story Section - Redesigned with centralized copy */}
      <SectionWrapper id="story" background="yellowish-brown">
        <SectionHeader
          eyebrow={story.eyebrow}
          title={story.title}
          subtitle={story.subtitle}
        />

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          {story.cards.map((card, index) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              image={galleryImagesWithBasePath[index]?.src || galleryImages[index]?.src}
              imageAlt={galleryImages[index]?.alt || card.title}
              index={index}
            />
          ))}
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 text-brand-600">
              {story.ourStory.title}
            </h3>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              {story.ourStory.paragraphs.map((para, index) => (
                <p key={index} className="text-justify">{para}</p>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[4/3] rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] overflow-hidden shadow-apple-xl group mt-8 md:mt-0"
          >
            <ParallaxImage
              src={basePath ? `${basePath}/assets/pexels-cottonbro-5052869.jpg` : "/assets/pexels-cottonbro-5052869.jpg"}
              alt="Professional hairstylist working in modern salon setting"
              speed={0.15}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 backdrop-blur-sm bg-white/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Text Marquee Section */}
      <div className="py-6 sm:py-8 md:py-10 bg-brand-50/30 backdrop-blur-sm overflow-hidden">
        <TextMarquee text="Braids • Twists • Locs • Weaving • Retwisting • Colored Braids • Natural Hair • Styling • Extensions • Consultations" direction="left" speed={2} opacity={0.2} />
      </div>


      {/* Gallery Section - Redesigned */}
      <SectionWrapper id="gallery" background="brand-50">
        <SectionHeader
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          subtitle={gallery.subtitle}
        />
        <MasonryGallery images={galleryImagesWithBasePath} />
      </SectionWrapper>

      {/* Booking Section - Redesigned */}
      <CTABand
        id="download"
        eyebrow={booking.eyebrow}
        title={booking.title}
        subtitle={booking.subtitle}
        primaryCTA={{
          label: booking.primaryCTA,
          onClick: () => window.location.href = `tel:${booking.phoneNumber}`,
        }}
        secondaryCTA={{
          label: booking.secondaryCTA,
          onClick: () => alert('Online booking coming soon!'),
        }}
      />

      {/* Location Section */}
      <LocationSection />

      {/* FAQ Section - Redesigned */}
      <SectionWrapper id="faq" background="brand-50" maxWidth="narrow">
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          subtitle={faq.subtitle}
        />
        <Accordion items={faq.items} />
      </SectionWrapper>

        <Footer />
      </div>
    </main>
  );
}

