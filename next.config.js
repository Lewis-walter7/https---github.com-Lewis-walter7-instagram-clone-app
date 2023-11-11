 /** @type {import('next').NextConfig} */
 // next.config.js

module.exports = {
    webpack: (config, { isServer }) => {
      // Add your webpack configurations here
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader'
      });
      if (!isServer) {
        config.resolve.fallback = {
            fs: false
        }
    }

    return config;
    },
};
/*const nextConfig = {}

module.exports = nextConfig*/
