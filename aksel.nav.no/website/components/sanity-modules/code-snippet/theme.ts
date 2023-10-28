import { PrismTheme } from "prism-react-renderer";

export const JetwaveDark: PrismTheme = {
  plain: {
    color: "#f8fafc",
    backgroundColor: "#011627",
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "#000080",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "var(--a-gray-300)",
      },
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "#569CD6",
      },
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "var(--a-gray-50)",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "#f8fafc",
      },
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "#9CDCFE",
      },
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "#cbd5e1",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "#D7BA7D",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "var(--a-green-200)",
      },
    },
    {
      types: ["tag"],
      languages: ["jsx"],
      style: {
        color: "var(--a-blue-200)",
      },
    },
    {
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "var(--a-blue-200)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#D4D4D4",
      },
    },
    {
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#7dd3fc",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "var(--a-green-200)",
      },
    },
    {
      types: ["char"],
      style: {
        color: "#D16969",
      },
    },
  ],
};

export default JetwaveDark;
