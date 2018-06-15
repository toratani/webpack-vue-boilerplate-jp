const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    autoprefixer({
      browsers: ['last 4 versions', 'iOS >= 8']
    }),
    precss
  ]
};
