/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   // for build time node_modules warnings
  //   config.ignoreWarnings = [
  //     { module: /node_modules\/node-fetch\/lib\/index\.js/ },
  //     { file: /node_modules\/node-fetch\/lib\/index\.js/ },
  //   ];

  //   return config;
  // },
  output: "standalone",
};

module.exports = nextConfig;
