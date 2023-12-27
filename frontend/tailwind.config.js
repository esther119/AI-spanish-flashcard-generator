/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const backfaceVisibility = plugin(function({ addUtilities }) {
  addUtilities({
    '.backface-visible': { 'backface-visibility': 'visible' },
    '.backface-hidden': { 'backface-visibility': 'hidden' },
  });
});

const rotateY = plugin(function({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': { 'transform': 'rotateY(180deg)' },
    '.rotate-y-360': { 'transform': 'rotateY(360deg)' },
    '.rotate-y-0': { 'transform': 'rotateY(0deg)' },
  });
});

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [backfaceVisibility, rotateY],
};
