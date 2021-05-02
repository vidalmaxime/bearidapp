// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    gradientColorStops: theme => ({
      'primary': '#07b46d',
      'secondary': '#068963',
    }),
    extend: {},
  },
  variants: {},
  plugins: [
      require("@tailwindcss/forms"),
  ],
}
