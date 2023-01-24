/**
 * Fikser https://github.com/navikt/Designsystemet/issues/1758
 */

const fs = require("fs");

const files = fs.readdirSync(`./esm`).filter((x) => x.endsWith(".d.ts"));

files.forEach((file) => {
  let data = fs.readFileSync(`./esm/${file}`).toString().split("\n");

  data = data.map((x) => {
    return x.includes("React.ForwardRefExoticComponent")
      ? x.split(":")[0] +
          `: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & SVGRProps & React.RefAttributes<SVGSVGElement>>;`
      : x;
  });

  fs.writeFileSync(`./esm/${file}`, data.join("\n"));
});
