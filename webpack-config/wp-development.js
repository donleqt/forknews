const {createConfig} = require('./lib/wp-common');

module.exports = createConfig({
  devServer: {
    port: 8080,
    hot: true,
  },
  css: {
    name: 'style.css',
    opt: {
      noPrefixer: false,
      noExtract: false,
      minify: false,
      fileLoad: false
    }
  }
});