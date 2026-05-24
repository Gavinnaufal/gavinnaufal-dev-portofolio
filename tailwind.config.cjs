/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d12',
        muted: '#4b5563',
        line: 'rgba(15, 23, 42, 0.1)',
        paper: '#ffffff',
        soft: '#f7f8fb',
        mist: '#eef3f8',
        accent: '#8fb3d9',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.08)',
        lift: '0 28px 90px rgba(15, 23, 42, 0.14)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
