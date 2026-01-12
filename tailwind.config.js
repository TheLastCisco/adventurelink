/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bastion-bg': '#071124',
        'neon-cyan': '#00F0FF',
        'bastion-gold': '#FFD37E',
      },
      boxShadow: {
        'neon': '0 0 12px rgba(0,240,255,0.16), 0 2px 12px rgba(0,0,0,0.6)'
      }
    },
  },
  plugins: [],
}
