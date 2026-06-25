/** @type {import('next').NextConfig} */
const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
  },
});

const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  // Disable experimental prefetch to avoid ERR_NETWORK_IO_SUSPENDED on localhost
  experimental: {
    optimisticClientCache: false,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = withMDX(nextConfig);
