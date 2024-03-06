module.exports = {
  content: [
    "./src/*.{html,js,css}",
    "./views/*.ejs",
  ],
  theme: {
    extend: {
      colors: {
        bgprimary: 'rgba(217, 217, 217, 0.15)',
        bl:'rgba(26, 145, 255, 1)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        Ubuntu: ['Ubuntu', 'serif'],
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};