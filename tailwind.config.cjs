/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        canvas: '#090a0c',
        surface: {
          DEFAULT: '#111216',
          elevated: '#17181f',
          muted: '#1e2029',
          card: '#13141a',
        },
        chalk: '#f4f4f0',
        silver: '#9b9da4',
        dim: '#5c606c',
        hairline: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.16)',
          faint: 'rgba(255, 255, 255, 0.04)',
        },
        signal: {
          DEFAULT: '#ff3b00',
          hover: '#ff5522',
          glow: 'rgba(255, 59, 0, 0.18)',
        },
        ink: '#0b0d12',
        muted: '#9b9da4',
        line: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.06em',
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'widest-mono': '0.18em',
      },
      borderRadius: {
        'micro': '2px',
        'subtle': '4px',
        'sharp': '0px',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
