module.exports = ({ paths, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});
