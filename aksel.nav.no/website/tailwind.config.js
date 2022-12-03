/* eslint-disable no-undef */
module.exports = {
  presets: [require("@navikt/ds-tailwind")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* Flytt ut fra extend og refactor bruk av screen */
    screens: {
      xs: "480px",
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
        header: "2.75rem",
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
        "focus-inverted-inset": "inset var(--a-shadow-focus-inverted)",
        "focus-inset": "inset var(--a-shadow-focus)",
        "focus-gap": "0 0 0 1px white, var(--a-shadow-focus)",
        "focus-gap-inset":
          "inset 0 0 0 2px var(--a-border-focus), inset 0 0 0 3px white",
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
        popup: {
          "0%": {
            transform: "translateY(0)",
          },
          "10%": {
            background: "var(--a-deepblue-500)",
          },
          "15%": {
            transform: "translateY(-100%)",
          },
          "20%": {
            background: "var(--a-deepblue-600)",
          },
          "50%": {
            background: "var(--a-deepblue-500)",
          },
          "90%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        textbounce: {
          "8%": {
            transform: "translateY(0)",
          },
          "17%": {
            transform: "translateY(-10%)",
          },
          "25%": {
            transform: "translateY(2%)",
          },
          "30%": {
            transform: "translateY(0)",
          },
        },
        popout: {
          "0%": {
            transform: "translateY(0px)",
          },
          "15%": {
            transform: "translateY(-100%)",
          },
          "90%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        shimmerBg: "shimmerBg 15s ease infinite",
        fadeInRight: "fadeInRight 0.30s ease-in-out forwards",
        fadeIn: "fadeIn 0.15s cubic-bezier(0.65, 0, 0.35, 1)",
        expand: "expand 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
        expandLg: "expandLg 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
        popup: "popup 2s cubic-bezier(0.215, 0.61, 0.355, 1)",
        popout: "popout 2s cubic-bezier(0.215, 0.61, 0.355, 1)",
        textbounce: "textbounce 2s cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    },
  },
};
