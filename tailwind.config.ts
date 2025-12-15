import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#071025',
          panel: '#0b1220'
        },
        accent: '#4fd1c5'
      },
      spacing: {
        header: '64px'
      },
      boxShadow: {
        panel: '0 10px 30px rgba(2,6,23,0.6)'
      }
    }
  },
  plugins: []
}

export default config
