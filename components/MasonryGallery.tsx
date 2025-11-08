'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
  videoSrc?: string;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4 md:space-y-5">
        {images.map((image, index) => (
          <Reveal key={image.id} delay={index * 0.1}>
            <motion.button
              onClick={() => openLightbox(index)}
              className="relative w-full mb-4 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 group"
              aria-label={`View ${image.alt} in lightbox`}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {image.type === 'video' && image.videoSrc ? (
                <video
                  src={image.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  aria-label={image.alt}
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto"
                  unoptimized
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8BukXbx4FjS1tWJh1FLm0u+JN6L6QvHdBq4gXQ9Yq2Oqo3v1YkWg=="
                />
              )}
              {image.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <svg
                    className="w-12 h-12 text-white opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              )}
            </motion.button>
          </Reveal>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={selectedIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

