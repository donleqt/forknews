const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const VersionPlugins = require('./version-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const babelOptions = require('./babel-options');
const seo = require('../../src/constants/seo');
const publicDir = path.resolve('dist');

const self = module.exports = {
  createConfig({css, name = 'main', env = process.env.ENV_VARIABLE || 'development', devServer}) {
    const htmlPlugin = new HtmlPlugin({
      template: `./src/templates/${name}.pug`,
      filename: `index.html`,
      inject: 'body'
    });
    const cssProcessor = self.getCssProcessor(css.name, css.opt);
    const babelLoaderHappy = self.happyPack({
      loader: 'babel-loader',
      options: {
        babelrc: false,
        cacheDirectory: true,
        ...babelOptions
      }
    });
    const res = {
      entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', `./src/index/${name}.jsx`]
      },
      output: {
        path: `${publicDir}`,
        filename: `${name}.js`,
        publicPath: "/"
      },
      resolve: {
        extensions: ['.js', '.jsx', 'json']
      },
      module: {
        loaders: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: babelLoaderHappy.loader
        },
          {
            test: /\.(png|svg|ico|gif|jpeg|woff|woff2|eot|ttf|otf)$/,
            exclude: '/public',
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          },
          {
            test: /\.pug$/,
            exclude: /node_modules/,
            use: [
              'html-loader',
              {
                loader: 'pug-html-loader',
                options: {
                  data: {
                    title: seo.title
                  }
                }
              }
            ]
          },
          cssProcessor.loader
        ]
      },
      plugins: [
        htmlPlugin,
        cssProcessor.plugin,
        new webpack.EnvironmentPlugin({
          NODE_ENV: env,
          BROWSER: true,
        }),
        babelLoaderHappy.plugin,
        ...(devServer && devServer.hot ? self.getHotReloadPlugin() : []),
        // ...Optimize.commonChunks
      ],
      node: {
        fs: 'empty'
      },
      ...(devServer ? self.getDevConfig({port: devServer.port, name, hot: devServer.hot}) : null)
    };

    if (env === 'production') {
      res.plugins = res.plugins.concat([
        new VersionPlugins(),
        new UglifyJSPlugin()
      ])
    }
    return res;
  },
  getCssProcessor: (name, {noPrefixer, minify, noExtract, fileLoad = true} = {}) => {
    const extractor = new ExtractTextPlugin(`css/${name}`);
    const loaderList = [{
      loader: 'css-loader',
      options: {
        minimize: !!minify,
        sourceMap: true,
        url: fileLoad
      }
    },
      noPrefixer ? null :
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function () {
                return [autoprefixer]
              }
            }
          },
      ...(fileLoad ? ['resolve-url-loader'] : []),
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }];
    const extracts = extractor.extract({
      fallback: 'style-loader',
      use: loaderList.filter(e => e !== null)
    });
    const plugins = noExtract ? ['style-loader'].concat(loaderList.filter(e => e !== null)) : extracts;
    return {
      loader: {
        test: /\.(css|scss)$/,
        use: plugins
      },
      plugin: noExtract ? () => null : extractor
    }
  },
  getDevConfig({port, name, hot} = {}) {
    return {
      devtool: 'source-map',
      devServer: {
        historyApiFallback: {
          rewrites: [
            {from: /.*/, to: `/${name}.html`}
          ]
        },
        host: 'localhost',
        disableHostCheck: true,
        port: port,
        hot: hot,
        contentBase: path.resolve('public')
      }
    }
  },
  getHotReloadPlugin() {
    return [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ];
  },
  happyPack(original) {
    const id = Date.now().toString();
    return {
      loader: `happypack/loader?id=${id}`,
      plugin: new HappyPack({
        id: id,
        verbose: true,
        threads: 10,
        loaders: Array.isArray(original) ? original : [original]
      })
    }
  }
};

