'use client';

import { useState } from 'react';
import { ColorToken, getContrastRating, isLightColor } from '@/lib/palette';
import ContrastBadge from './ContrastBadge';

interface ColorSwatchProps {
  color: ColorToken;
  showHex?: boolean;
  showContrast?: boolean;
}

export default function ColorSwatch({
  color,
  showHex = true,
  showContrast = true,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Check contrast for both light and dark text on this color
  const darkText = { r: 11, g: 11, b: 12 }; // #0B0B0C
  const lightText = { r: 255, g: 255, b: 255 }; // #FFFFFF
  
  const darkTextContrast = showContrast
    ? getContrastRating(darkText, color.rgb)
    : null;
  const lightTextContrast = showContrast
    ? getContrastRating(lightText, color.rgb)
    : null;
  
  // Use the better contrast rating (prefer AAA, then AA, then whichever is better)
  const contrast = showContrast && darkTextContrast && lightTextContrast
    ? (darkTextContrast.level === 'AAA' || 
       (darkTextContrast.level !== 'fail' && lightTextContrast.level === 'fail'))
      ? darkTextContrast
      : (lightTextContrast.level === 'AAA' || lightTextContrast.level === 'AA')
      ? lightTextContrast
      : darkTextContrast.level !== 'fail' ? darkTextContrast : lightTextContrast
    : null;

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="w-full aspect-square rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        style={{ backgroundColor: color.hex }}
        aria-label={`Copy color ${color.name} hex code ${color.hex}`}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </button>
      {showHex && (
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{color.name}</span>
            {showContrast && contrast && (
              <ContrastBadge level={contrast.level} />
            )}
          </div>
          <button
            onClick={handleCopy}
            className="mt-1 text-xs text-gray-600 hover:text-brand-600 font-mono transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              color.hex
            )}
          </button>
        </div>
      )}
    </div>
  );
}

