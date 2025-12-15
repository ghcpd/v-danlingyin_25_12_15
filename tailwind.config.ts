import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        accent: '#7c3aed'
      }
    }
  },
  plugins: []
}

export default config
