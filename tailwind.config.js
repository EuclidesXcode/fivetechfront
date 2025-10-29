module.exports = {
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 60s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
      backdropBlur: {
        '4xl': '0px',
        '5xl': '0px',
      }
    },
  },
  // ...
}