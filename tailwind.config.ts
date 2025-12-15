import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      keyframes: {
        'value-pop': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.06)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'value-pop': 'value-pop 400ms ease'
      }
    }
  },
  plugins: []
}

export default config
