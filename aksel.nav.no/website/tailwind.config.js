module.exports = {
  presets: [require("@navikt/ds-tailwind")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    data: {
      active: 'active~="true"',
    },
    extend: {
      colors: {
        "aksel-heading": "var(--a-deepblue-800)",
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        teal: {
          50: "#defcf6",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        amber: {
          50: "#fefce9",
          100: "#fdf9c7",
          200: "#fdf193",
          300: "#fbe15b",
          400: "#fcd34d",
          500: "#f59e0b",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        violet: {
          50: "#f5edff",
          100: "#e9def8",
          200: "#d6c3ee",
          300: "#bd9fe4",
          400: "#a575e1",
          500: "#9862db",
          600: "#7b42c2",
          700: "#642bab",
          800: "#471487",
          900: "#2c0162",
        },
      },
      spacing: {
        0: 0,
        header: "4rem",
        sidebar: "16rem",
        text: "600px",
      },
      maxWidth: {
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
        "focus-gap": "0 0 0 1px white, var(--a-shadow-focus)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        popUp: {
          "0%": { transform: "translateY(0.75rem)" },
          "100%": { transform: "translateY(0)" },
        },
        toc: {
          "0%": { opacity: 0.2 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.15s cubic-bezier(0.65, 0, 0.35, 1)",
        toc: "toc 0.15s cubic-bezier(0.65, 0, 0.35, 1)",
        popUpPage: "popUp 0.4s cubic-bezier(0.19, 0.91, 0.38, 1)",
      },
    },
  },
};
