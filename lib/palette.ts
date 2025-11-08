export interface ColorToken {
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
}

export const brandPalette: ColorToken[] = [
  { name: 'brand-50', hex: '#f5f0ed', rgb: { r: 245, g: 240, b: 237 } },
  { name: 'brand-100', hex: '#ead9d1', rgb: { r: 234, g: 217, b: 209 } },
  { name: 'brand-200', hex: '#d5b3a3', rgb: { r: 213, g: 179, b: 163 } },
  { name: 'brand-300', hex: '#c08d75', rgb: { r: 192, g: 141, b: 117 } },
  { name: 'brand-400', hex: '#ab6757', rgb: { r: 171, g: 103, b: 87 } },
  { name: 'brand-500', hex: '#a47864', rgb: { r: 164, g: 120, b: 100 } }, // Pantone 17-1230 Mocha Mousse
  { name: 'brand-600', hex: '#8d6353', rgb: { r: 141, g: 99, b: 83 } },
  { name: 'brand-700', hex: '#764e42', rgb: { r: 118, g: 78, b: 66 } },
  { name: 'brand-800', hex: '#5f3931', rgb: { r: 95, g: 57, b: 49 } },
  { name: 'brand-900', hex: '#482420', rgb: { r: 72, g: 36, b: 32 } },
];

export const extendedPalette: ColorToken[] = [
  { name: 'honey-blonde', hex: '#f4d03f', rgb: { r: 244, g: 208, b: 63 } },
  { name: 'auburn', hex: '#a0522d', rgb: { r: 160, g: 82, b: 45 } },
  { name: 'chocolate', hex: '#7b3f00', rgb: { r: 123, g: 63, b: 0 } },
  { name: 'caramel', hex: '#d2691e', rgb: { r: 210, g: 105, b: 30 } },
  { name: 'platinum', hex: '#e5e4e2', rgb: { r: 229, g: 228, b: 226 } },
  { name: 'rose-gold', hex: '#e8b4b8', rgb: { r: 232, g: 180, b: 184 } },
];

/**
 * Calculate relative luminance for a color
 * Based on WCAG 2.1 specification
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.1 specification
 */
export function getContrastRatio(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get WCAG contrast rating for text on background
 */
export function getContrastRating(
  textColor: { r: number; g: number; b: number },
  bgColor: { r: number; g: number; b: number }
): { level: 'AA' | 'AAA' | 'fail'; ratio: number } {
  const ratio = getContrastRatio(textColor, bgColor);
  
  // Large text (18pt+ or 14pt+ bold): AA = 3:1, AAA = 4.5:1
  // Normal text: AA = 4.5:1, AAA = 7:1
  // We'll use normal text standards
  if (ratio >= 7) {
    return { level: 'AAA', ratio };
  } else if (ratio >= 4.5) {
    return { level: 'AA', ratio };
  } else {
    return { level: 'fail', ratio };
  }
}

/**
 * Check if color is light (for determining text color)
 */
export function isLightColor(color: { r: number; g: number; b: number }): boolean {
  const luminance = getLuminance(color.r, color.g, color.b);
  return luminance > 0.5;
}

/**
 * Generate download JSON with all color tokens
 */
export function generateColorTokensJSON(): string {
  const tokens = {
    brand: brandPalette,
    extended: extendedPalette,
    generated: new Date().toISOString(),
  };
  return JSON.stringify(tokens, null, 2);
}

