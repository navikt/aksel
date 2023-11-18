const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;

const decodeAssetId = (id) => {
  const [, assetId, dimensions, format] = pattern.exec(id);
  const [width, height] = dimensions.split("x").map((v) => parseInt(v, 10));

  return {
    assetId,
    dimensions: { width, height },
    format,
  };
};

const BaseSEOPreset = {
  title: "SEO",
  type: "object",
  name: "seo",
  group: "seo",
  fields: [
    {
      name: "meta",
      type: "text",
      title: "OG-description (valgfri)",
      description: "Erstatter ingress som OG-description og meta-tag",
      rows: 3,
      options: {
        //@ts-ignore
        maxLength: 160,
      },
    },
    {
      title: "OG-image",
      name: "image",
      type: "image",
      description: "Anbefalt størrelse er 1200:630px",
      options: {
        accept: "image/*",
      },
      validation: (Rule) =>
        Rule.custom((image) => {
          if (!image) return true;
          const { dimensions } = decodeAssetId(image.asset._ref);
          const aspectR = dimensions.width / dimensions.height;
          if (aspectR < 1.5 || aspectR > 2.4) {
            return `Må ha aspect-ratio på ~1.91:1. Er nå: ${aspectR.toFixed(
              2
            )}:1. (${dimensions.width}px/${dimensions.height}px)`;
          }
          return true;
        }),
    },
  ],
};

export default BaseSEOPreset;
