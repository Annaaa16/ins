module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontSize: require('./src/lib/tailwind/fontSize'),
    spacing: require('./src/lib/tailwind/spacing'),
    extend: {
      fontFamily: require('./src/lib/tailwind/fontFamily'),
      lineHeight: require('./src/lib/tailwind/lineHeight'),
      borderWidth: require('./src/lib/tailwind/borderWidth'),
      colors: require('./src/lib/tailwind/colors'),
      keyframes: require('./src/lib/tailwind/keyframes'),
      animation: require('./src/lib/tailwind/animation'),
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
