const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const babel = require('./webpack/babel');
const fonts = require('./webpack/fonts');
const images = require('./webpack/images');
const sass = require('./webpack/sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devconfig = require('./webpack/dev.config');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

const common = merge([
  {
    externals: {
      paths: PATHS
    },
    entry: {
      app: PATHS.src,
    },
    output: {
      filename: `${PATHS.assets}js/[name].[hash].js`,
      path: PATHS.dist,
      publicPath: '/'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `./postcss.config.js` } }
          }
        ]
      }]
    },
    resolve: {
      alias: {
        '~': PATHS.src,
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].[hash].css`,
      }),
      new CopyWebpackPlugin([
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/static`, to: '' },
      ]),
      ...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page.replace(/\.pug/,'.html')}`
      }))
    ],
  },
  pug(),
  babel(),
  fonts(),
  images(),
  sass(),
]);

module.exports = function(env) {
  if (env === 'production') {
    return common;
  }
  if (env === 'development') {
    return merge([
      common,
      devconfig(),
    ]);
  }
};
