module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          },
        },
      ],
    },
  };
};
