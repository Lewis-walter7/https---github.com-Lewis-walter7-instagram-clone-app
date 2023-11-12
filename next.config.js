 /** @type {import('next').NextConfig} */
 // next.config.jss

//const nextConfig = {}

module.exports = {
  module:{
    loaders:[
      { test: /\.html$/, loader: 'ignore-loader' }
    ]
  }
}
