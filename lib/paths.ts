/**
 * Get the base path for the current environment
 * This matches the basePath in next.config.mjs
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages
    const pathname = window.location.pathname;
    if (pathname.startsWith('/oyatz')) {
      return '/oyatz';
    }
  }
  // Server-side or local development
  return process.env.GITHUB_PAGES_BASE_PATH || '';
}

/**
 * Get the correct asset path for static assets
 * Handles basePath for GitHub Pages deployment
 * Use this for video src, img src, and other direct asset references
 */
export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Combine basePath with asset path
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

