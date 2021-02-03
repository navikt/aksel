const JSZip = require("jszip");
const canvg = require("canvg");

export const generatePngZip = async (svgstring: string, name: string) => {
  const sizes = [16, 24, 128, 256];

  const zip = new JSZip();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  sizes.forEach((size) => {
    let svg = svgstring.replace(/width="[^"]*"/, `width="${size}px"`);
    svg = svg.replace(/height="[^"]*"/, `height="${size}px"`);

    const v = canvg.Canvg.fromString(ctx, svg);
    v.start();

    const data = canvas
      .toDataURL("image/png", 1)
      .replace(/^data:image\/\w+;base64,/, "");

    v.stop();

    zip
      .folder(`${name}-png`)
      .file(`${name}-${size}px.png`, data, { base64: true });
  });

  return await zip.generateAsync({ type: "blob" });
};
