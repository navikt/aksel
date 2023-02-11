/**
 * Fikser https://github.com/navikt/aksel/issues/1758
 */

const fs = require("fs");

const basePath = "./dist/esm";

const files = fs.readdirSync(basePath).filter((x) => x.endsWith(".d.ts"));

files.forEach((file) => {
  let data = fs.readFileSync(`${basePath}/${file}`).toString().split("\n");

  data = data.map((x) => {
    return x.includes("React.ForwardRefExoticComponent")
      ? x.split(":")[0] +
          `: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & SVGRProps & React.RefAttributes<SVGSVGElement>>;`
      : x;
  });

  fs.writeFileSync(`${basePath}/${file}`, data.join("\n"));
});
