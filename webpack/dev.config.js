const webpack =  require('webpack')

module.exports = function() {
  return {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      port: 8081,
      overlay: {
        warnings: true,
        errors: true
      }
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      })
    ]
  };
};
