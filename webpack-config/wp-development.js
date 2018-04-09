const {createConfig} = require('./lib/wp-common');

module.exports = createConfig({
  devServer: {
    port: 4200,
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