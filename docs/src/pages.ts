export interface NavdsPage {
  pathName?: string;
  children?: NavdsPage[];
  title?: string;
}

const pages: NavdsPage[] = [
  {
    pathName: "/kom-i-gang",
  },
  {
    title: "Komponenter",
    children: [
      { pathName: "/komponenter", title: "Kom i gang" },
      { pathName: "/komponenter/alert" },
      { pathName: "/komponenter/accordion" },
      { pathName: "/komponenter/button" },
      {
        title: "Interne flater",
        children: [
          { pathName: "/komponenter/interne-flater/header" },
          { pathName: "/komponenter/interne-flater/copy-knapp" },
        ],
      },
    ],
  },
  {
    title: "Ikonpakke",
    children: [
      { pathName: "/ikonpakke", title: "Ikonsøk" },
      { pathName: "/ikonpakke/installering" },
    ],
  },
  {
    title: "Retningslinjer",
    children: [
      { pathName: "/retningslinjer/farger" },
      { pathName: "/retningslinjer/typografi" },
      { pathName: "/retningslinjer/språk" },
    ],
  },
  {
    pathName: "/kontakt",
    title: "Kontakt oss",
  },
];

export default pages;
