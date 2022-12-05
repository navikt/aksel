export const artikkelPreview = (type: string) => {
  return {
    preview: {
      select: {
        heading: "heading",
        tema: "tema.0.title",
        kategori: "kategori",
      },
      prepare(selection) {
        const { heading, tema, kategori } = selection;
        return {
          title: heading,
          subtitle: `${type} / ${tema ?? kategori ?? "(ingen gruppering)"}`,
        };
      },
    },
  };
};
