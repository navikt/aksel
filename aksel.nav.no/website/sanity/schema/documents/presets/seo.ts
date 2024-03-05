import { defineField } from "sanity";

const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;

const decodeAssetId = (id: string) => {
  const exec = pattern.exec(id);
  if (!exec) {
    return null;
  }

  const [, assetId, dimensions, format] = exec;
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
    defineField({
      name: "meta",
      type: "text",
      title: "OG-description (valgfri)",
      description: "Erstatter ingress som OG-description og meta-tag",
      rows: 3,
      options: {
        // @ts-expect-error - maxLength is a custom prop not officially supported
        maxLength: 160,
      },
    }),
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
          const decode = decodeAssetId(image.asset._ref);
          if (!image || !decode) {
            return true;
          }

          const aspectR = decode.dimensions.width / decode.dimensions.height;
          if (aspectR < 1.5 || aspectR > 2.4) {
            return `Må ha aspect-ratio på ~1.91:1. Er nå: ${aspectR.toFixed(
              2,
            )}:1. (${decode.dimensions.width}px/${decode.dimensions.height}px)`;
          }
          return true;
        }),
    },
  ],
};

export default BaseSEOPreset;
