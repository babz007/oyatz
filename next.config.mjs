const isStatic = true;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  trailingSlash: isStatic,
  images: { unoptimized: isStatic },
};

export default nextConfig;

