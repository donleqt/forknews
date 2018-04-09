const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  commonChunks: [
    new CommonsChunkPlugin({
      name: ['vendor'],
      filename: "[name].js",
    }),
    new CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
    })
  ]
};