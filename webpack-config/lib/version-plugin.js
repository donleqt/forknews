function VersionPlugins() {
}

VersionPlugins.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function (data, callback) {
      const {js, css,} = data.assets;
      const v = Date.now();
      js.map(e => {
        data.html = data.html.replace(`src="${e}"`, `src="${e}?v=${v}"`);
      });
      css.map(e => {
        data.html = data.html.replace(`href="${e}"`, `href="${e}?v=${v}"`);
      });
      callback(null, data);
    });
  });

};

module.exports = VersionPlugins;