 /** @type {import('next').NextConfig} */
 // next.config.js

module.exports = {
    webpack: (config) => {
      // Add your webpack configurations here
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader'
      });
  
      return config;
    },
};
/*const nextConfig = {}

module.exports = nextConfig*/
