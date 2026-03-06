import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      colors: {
        keep: {
          yellow:  '#fff475',
          red:     '#f28b82',
          orange:  '#fbbc04',
          green:   '#ccff90',
          teal:    '#a7ffeb',
          blue:    '#cbf0f8',
          darkblue:'#aecbfa',
          purple:  '#d7aefb',
          pink:    '#fdcfe8',
          brown:   '#e6c9a8',
          gray:    '#e8eaed',
          darkgray:'#b0bec5',
        }
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'scale-in':   'scaleIn 0.2s ease-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                    to: { opacity: '1' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'note': '0 1px 2px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.1), 0 4px 8px rgba(0,0,0,.05)',
        'note-hover': '0 4px 8px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.1)',
      }
    },
  },
  plugins: [],
}

export default config
