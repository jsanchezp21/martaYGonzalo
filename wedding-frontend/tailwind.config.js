module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        greenDeep: '#2f3f33',
        greenDark: '#3e5844',
        greenSoft: '#a8d5ba',
        cream: '#fdfbf4',
        cream2: '#f5f9f4',
        insta1: '#c13584',
        insta2: '#dd2a7b',
        graySoft: '#eae9e3',
        grayText: '#6a7b6e',
        grayBody: '#555'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
