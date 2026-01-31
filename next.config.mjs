// next.config.mjs

// Static export for GitHub Pages
const isStatic = true;

// Set this only when deploying to GitHub Project Pages under /oyatz
// Example in CI: NEXT_PUBLIC_GH_PAGES=true
const isProjectPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true';

// Use a subpath only for project pages. Custom domain at root uses no basePath.
const basePath = isProjectPages ? '/oyatz' : '';
const assetPrefix = isProjectPages ? '/oyatz/' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  basePath,
  assetPrefix,
  trailingSlash: isStatic,
  images: { unoptimized: isStatic },
};

export default nextConfig;



// const isStatic = true;
// // GitHub Pages base path - change this if your repository name is different
// // Set GITHUB_PAGES_BASE_PATH environment variable in your workflow
// const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: isStatic ? 'export' : undefined,
//   basePath: basePath,
//   trailingSlash: isStatic,
//   images: { unoptimized: isStatic },
//   assetPrefix: basePath,
// };

// export default nextConfig;

