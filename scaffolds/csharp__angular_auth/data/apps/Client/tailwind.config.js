/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C5DFA',
        secondary: '#9277FF',
        danger: '#EC5757',
        success: '#33D69F',
      },
    },
  },
  plugins: [],
};
