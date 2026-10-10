/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#06090e',
          900: '#0a0f18',
          850: '#0f172a',
          800: '#141d2e',
          700: '#1e293b',
          600: '#334155',
          border: '#27354a',
        },
        among: {
          table: '#2b5c8f',
          tableDark: '#1b3d63',
          tableLight: '#3978b8',
          tableFloor: '#a8b3be',
          tileLight: '#b4bfc9',
          tileDark: '#99a5b0',
          wall: '#404c5c',
          wallDark: '#2c3542',
          cyanGlow: '#38bdf8',
          visor: '#93c5fd',
          visorDark: '#60a5fa',
          visorHighlight: '#ffffff',
          crewRed: '#c51111',
          crewBlue: '#132ed1',
          crewGreen: '#117f2d',
          crewPink: '#ed54ba',
          crewOrange: '#ef7d0d',
          crewYellow: '#f5f557',
          crewBlack: '#3f474e',
          crewWhite: '#d6e0f0',
          crewPurple: '#6b2fbb',
          crewBrown: '#71491e',
          crewCyan: '#38fedc',
          crewLime: '#50ef39'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -2px rgba(56, 189, 248, 0.4)',
        'glow-emerald': '0 0 20px -2px rgba(16, 185, 129, 0.4)',
        'glow-rose': '0 0 20px -2px rgba(244, 63, 94, 0.4)',
        'panel': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)'
      }
    },
  },
  plugins: [],
}
