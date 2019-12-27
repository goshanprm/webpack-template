import { SourceMapDevToolPlugin } from 'webpack';

export default () => ({
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8081,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});
