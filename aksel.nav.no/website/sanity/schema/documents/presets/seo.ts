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

export const SEOFields = {
  name: "seo",
  type: "object",
  title: "SEO",
  group: "seo",
  fields: [
    {
      name: "meta",
      type: "text",
      title: "Meta/:og description",
      description:
        "Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description",
      rows: 3,
    },
    {
      title: "og:Image",
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
            return `Forventet aspect-ration rundt 1.91:1. Er nå: ${aspectR}:1.`;
          }
          return true;
        }),
    },
  ],
};
