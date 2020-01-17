module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    // open: process.platform === 'darwin',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    // hotOnly: false,
  },
}