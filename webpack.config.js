// config in this file is not directly used by Razzle.
// but is used in `razzle.config.js` to override the webpack config created by Razzle.

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      environments: path.resolve(__dirname, 'environments'),
    },
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
};
