import browserslist from "browserslist";
import CleanCss from "clean-css";
import fs from "fs";
import { Features, browserslistToTargets, bundleAsync } from "lightningcss";
import path from "path";

const buildDir = path.join(__dirname, "..", "dist/darkside");

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

async function bundleCSS() {
  const { code } = await bundleAsync({
    filename: `${__dirname}/index.css`,
    minify: false,
    include:
      Features.Nesting | Features.MediaRangeSyntax | Features.HexAlphaColors,

    drafts: {
      customMedia: false,
    },
    targets: browserslistToTargets(
      browserslist(">= 0.5% in NO, safari >= 15.4, iOS >= 15.4, not dead"),
    ),
    resolver: {
      read(filePath) {
        const file = fs.readFileSync(filePath, "utf8");
        return file;
      },
    },
  });

  let codeString = code.toString();

  /**
   * LightningCSS adds these tokens to the bundle that we want removed:
   * --lightningcss-light: initial;
   * --lightningcss-dark: ;
   */
  codeString = codeString
    .split("\n")
    .filter((line) => !line.includes("--lightningcss-"))
    .join("\n");

  return codeString;
}

function writeFile({ file, filePath }: { file: string; filePath: string }) {
  fs.writeFileSync(`${buildDir}/${filePath}`, file);

  const minifiedCss = new CleanCss({}).minify(file);

  if (minifiedCss.errors.length > 0) {
    console.error(
      `Errors found when minifying for ${filePath} CSS. Stopped bundling`,
    );
  }

  fs.writeFileSync(
    `${buildDir}/${filePath.replace(".css", ".min.css")}`,
    minifiedCss.styles,
  );
}

/* Build index files */
bundleCSS().then((file) => {
  writeFile({
    file,
    filePath: "index.css",
  });
});
