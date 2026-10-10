/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      /* ── Design Tokens ── */
      colors: {
        paper:   '#EFEDE8',   // hero background
        charcoal:'#1E1E1E',   // dark section bg
        ink:     '#000000',   // pure black for text
        red:     '#E02A1F',   // accent red
        'red-dusty': '#B85C5C', // muted terracotta red
        'off-white': '#F5F2EE',
        label:   '#8A8A8A',   // small labels on light bg
        'label-dark': '#BFBFBF', // small labels on dark bg
      },
      fontFamily: {
        /* Anton: condensed bold hero word */
        display: ['"Anton"', 'sans-serif'],
        /* Montserrat: labels, nav, body */
        sans:    ['"Montserrat"', 'sans-serif'],
        /* Playfair Display: italic highlight words only */
        serif:   ['"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.25em',
      },
      borderRadius: {
        '4xl': '2rem',     // ~32px card corners
        '5xl': '2.5rem',   // ~40px featured video corners
      },
      height: {
        screen: '100dvh',  // dynamic viewport height for mobile
      },
    },
  },
  plugins: [],
}
