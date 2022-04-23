module.exports = {
  spinner: {
    to: {
      transform: 'rotate(360deg)',
    },
  },
  zoomIn: {
    from: {
      opacity: 0,
      transform: 'scale(0.85)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  'like-button': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '25%': {
      transform: 'scale(1.2)',
    },
    '50%': {
      transform: 'scale(0.95)',
    },
  },
  'like-feed': {
    '0%': {
      transform: 'scale(0)',
    },
    '15%': {
      transform: 'scale(1.2)',
    },
    '30%, 70%': {
      transform: 'scale(1)',
    },
    '95%, 100%': {
      transform: 'scale(0)',
    },
  },
  skeleton: {
    from: {
      'background-position-x': '-100%',
    },
    to: {
      'background-position-x': '100%',
    },
  },
};
