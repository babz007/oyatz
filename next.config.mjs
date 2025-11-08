const isStatic = true;
// GitHub Pages base path - change this if your repository name is different
// Set GITHUB_PAGES_BASE_PATH environment variable in your workflow
const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  basePath: basePath,
  trailingSlash: isStatic,
  images: { unoptimized: isStatic },
  assetPrefix: basePath,
};

export default nextConfig;

