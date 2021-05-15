/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-commonjs */

const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer,
    // remove unused classes and minify for production
    ...(process.env.NODE_ENV === 'production'
      ? [
        purgecss({
          content: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
          defaultExtractor: (content) => content.match(/[A-Za-z0-9-_://]+/g) || [],
          whitelist: ['bp3-portal'],
        }),
        cssnano({
          preset: 'default',
        }),
      ]
      : []),
  ],
};
