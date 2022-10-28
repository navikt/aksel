/* eslint-disable no-undef */
module.exports = {
  presets: [require("@navikt/ds-tailwind")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* Flytt ut fra extend og refactor bruk av screen */
    screens: {
      xs: "564px",
      sm: "648px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "Arial", "sans-serif"],
      },
      transitionProperty: {
        width: "width",
        gap: "gap",
      },
      spacing: {
        0: 0,
        header: "3.5rem",
        sidebar: "18rem",
        text: "600px",
      },
      maxWidth: {
        "screen-sidebar": "calc(100vw - 18rem)",
        "content-w-padding": "896px",
        aksel: "1280px",
        text: "600px",
        prose: "75ch",
      },
      minWidth: ({ theme }) => ({
        header: "3.5rem",
        ...theme("spacing"),
      }),
      minHeight: ({ theme }) => ({
        "screen-header": "calc(100vh - 3.5rem)",
        ...theme("spacing"),
      }),

      boxShadow: {
        "focus-inverted-inset": "inset var(--navds-shadow-focus-inverted)",
        "focus-inset": "inset var(--navds-shadow-focus)",
        "focus-gap": "0 0 0 1px white, var(--navds-shadow-focus)",
        header: "inset 0 -1px 0 rgb(180, 180, 180, 0.1)",
      },
      keyframes: {
        shimmerBg: {
          "0%": { backgroundSize: "400% 400%", backgroundPosition: "0% 0%" },
          "50%": {
            backgroundSize: "400% 400%",
            backgroundPosition: "100% 100%",
          },
          "100%": { backgroundSize: "400% 400%", backgroundPosition: "0% 0%" },
        },
        fadeInRight: {
          "0%": { width: "20%", opacity: 0.5 },
          "100%": { width: "100%", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        expand: {
          "0%": {
            opacity: 0.2,
            width: "30%",
          },
          "100%": {
            opacity: 1,
            width: "100%",
          },
        },
        expandLg: {
          "0%": {
            opacity: 0.2,
            width: "100px",
          },
          "100%": {
            opacity: 1,
            width: "500px",
          },
        },
      },
      animation: {
        shimmerBg: "shimmerBg 15s ease infinite",
        fadeInRight: "fadeInRight 0.30s ease-in-out forwards",
        fadeIn: "fadeIn 0.15s cubic-bezier(0.65, 0, 0.35, 1)",
        expand: "expand 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
        expandLg: "expandLg 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    },
  },
};
