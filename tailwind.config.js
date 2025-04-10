module.exports = {
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      boxShadow: {
        neumorphismdark:
          "inset 1px 1px 3px #1f2327,9px 9px 20px rgb(11, 11, 11, 0.8),-0px -0px 20px #1f2327",
        neumorphismlight:
          "inset 1px 1px 5px #fff, 9px 9px 20px rgba(222, 222, 222, 0.8),-0px -0px 20px #ffffff",
      },
    },
  },
}; 