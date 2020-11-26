module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['src/**/*.vue'],
  theme: {
    fontFamily: {
      mono: ['Overpass Mono', 'monospace'],
      body: ['Asap', 'sans-serif'],
    },
    maxWidth: {
      '500px': '500px',
    },
    extend: {
      opacity: ['disabled'],
    },
  },
  variants: {},
  plugins: [],
};
