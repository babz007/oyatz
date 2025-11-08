/**
 * Centralized asset paths configuration
 * Update video and image paths here to change them site-wide
 */

export const ASSETS = {
  // Background video for the entire site
  backgroundVideo: '/assets/7507183-hd_1920_1080_25fps.mp4',
  
  // Hero section image (if needed as fallback)
  heroImage: '/assets/pexels-cottonbro-5052869.jpg',
  
  // Story section image
  storyImage: '/assets/pexels-cottonbro-5052869.jpg',
} as const;

/**
 * Get asset path with basePath prefix for GitHub Pages
 */
export function getAssetPath(assetPath: string, basePath: string = ''): string {
  if (!basePath) return assetPath;
  // Remove leading slash from asset path
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${basePath}/${cleanPath}`;
}

