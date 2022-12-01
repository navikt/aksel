export const artikkelPreview = {
  preview: {
    select: {
      heading: "heading",
      tema: "tema",
      tema0: "tema.0.seksjoner",
      tema1: "tema.1.seksjoner",
      tema2: "tema.2.seksjoner",
      tema3: "tema.3.seksjoner",
      tema4: "tema.4.seksjoner",
      tema5: "tema.5.seksjoner",
    },
    prepare(selection) {
      const { heading } = selection;
      return {
        title: heading,
      };
    },
  },
};
