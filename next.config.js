/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure that canvas is added to externals if you're using pdfjs
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};

module.exports = nextConfig;
