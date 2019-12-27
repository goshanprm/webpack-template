import { loader as _loader } from 'mini-css-extract-plugin';

export default () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          _loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } },
          },
        ],
      },
    ],
  },
});
