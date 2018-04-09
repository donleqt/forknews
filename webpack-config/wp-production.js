const {createConfig} = require('./lib/wp-common');

module.exports = createConfig({
  env: 'production',
  css: {
    name: 'style.css',
    opt: {
      noPrefixer: false,
      noExtract: false,
      minify: true,
      fileLoad: true
    }
  }
});