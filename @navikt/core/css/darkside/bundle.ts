import browserslist from "browserslist";
import CleanCss from "clean-css";
import fastglob from "fast-glob";
import fs from "fs";
import { Features, browserslistToTargets, bundleAsync } from "lightningcss";
import path from "path";
import {
  StyleMappings,
  componentsCss,
  formCss,
  primitivesCss,
} from "../config/_mappings";
import packageJSON from "../package.json";

bundleDarkside();

async function bundleDarkside() {
  const buildDir = path.join(__dirname, "..", "dist/darkside");

  /* Make sure every dir is created to make node happy */
  [buildDir, `${buildDir}/global`, `${buildDir}/component`].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  /**
   * Bundles the ./index.css file with LightningCSS.
   * @param rootParser: Custom parsers that allows for editing the index.css file before bundling it. This allows removing unwanted CSS from being bundled.
   * @returns Parsed CSS file output. Must be valid CSS.
   */
  async function bundleCSS(rootParser?: (rootFile: string) => string) {
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
          if (filePath === `${__dirname}/index.css` && rootParser) {
            return rootParser(file);
          }

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

  /**
   * Writes the CSS file to the build directory. Includes a minified version with the .min.css suffix.
   * @param file: CSS file content
   * @param filePath: Path to the file in the build directory
   */
  function writeFile({ file, filePath }: { file: string; filePath: string }) {
    fs.writeFileSync(`${buildDir}/${filePath}`, file);

    /* We use CleanCss package here since we only want it to optimize filesize, not transform any CSS like LightningCSS minifier does */
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

  /* ----------------------------- index.css build ---------------------------- */
  await bundleCSS().then((file) => {
    writeFile({
      file,
      filePath: "index.css",
    });
  });

  /* --------------------------- component.css build -------------------------- */
  function rootComponentsParser(rootString: string) {
    let parsed = rootString
      .split("\n")
      .filter((line) => {
        /* We assume that all components is added under the layer components or layout */
        return (
          line.endsWith("layer(aksel.components);") ||
          line.endsWith("layer(aksel.layout);")
        );
      })
      .join("\n");

    const rootFile = fs.readFileSync(`${__dirname}/index.css`, "utf8");

    /* In the off-chance one imports this file standalone, we would like to make sure the layering order is included.  */
    const layerDefinition = rootFile
      .split("\n")
      .find((line) => line.startsWith("@layer"));

    if (!layerDefinition) {
      console.error("No layer definition found in index.css. Stopped bundling");
      process.exit(1);
    }

    parsed = layerDefinition + "\n" + parsed;

    return parsed;
  }

  await bundleCSS(rootComponentsParser).then((file) => {
    writeFile({
      file,
      filePath: componentsCss,
    });
  });

  /* ------------------------------ /global build ----------------------------- */
  for (const style of StyleMappings.baseline) {
    // eslint-disable-next-line no-inner-declarations
    function parser(input: string) {
      return input
        .split("\n")
        .filter((line) => line.startsWith("@import"))
        .filter((line) =>
          line.replace(".darkside.css", ".css").includes(style.main),
        )
        .join("\n");
    }

    await bundleCSS(parser).then((file) => {
      writeFile({
        file,
        filePath: `global/${style.main}`,
      });
    });
  }

  /* ------------------------------ form build ----------------------------- */
  function rootFormParser(input: string) {
    return input
      .split("\n")
      .filter((line) => line.startsWith("@import"))
      .filter((line) => line.includes("form/index.css"))
      .join("\n");
  }

  await bundleCSS(rootFormParser).then((file) => {
    writeFile({
      file,
      filePath: `component/${formCss}`,
    });
  });

  /* ------------------------------ Primitives build ----------------------------- */
  function rootPrimitivesParser(input: string) {
    return input
      .split("\n")
      .filter((line) => line.startsWith("@import"))
      .filter((line) => line.includes("primitives/index.css"))
      .join("\n");
  }

  await bundleCSS(rootPrimitivesParser).then((file) => {
    writeFile({
      file,
      filePath: `component/${primitivesCss}`,
    });
  });

  /* ---------------------------- /component build ---------------------------- */

  function componentFiles(): string[] {
    const indexFile = fs.readFileSync(`${__dirname}/index.css`, "utf8");

    /* Since forms and primitives is under the same layers, but diffferent files we filter them out to avoid duplicates */
    const formLine = rootFormParser(indexFile);
    const primitivesLine = rootPrimitivesParser(indexFile);

    return indexFile
      .split("\n")
      .filter((line) => line.startsWith("@import"))
      .filter((line) => !formLine.includes(line))
      .filter((line) => !primitivesLine.includes(line))
      .filter((line) => line.endsWith("layer(aksel.components);"));
  }

  for (const componentLine of componentFiles()) {
    // eslint-disable-next-line no-inner-declarations
    function parser(input: string) {
      return input
        .split("\n")
        .filter((line) => line === componentLine)
        .join("\n");
    }

    await bundleCSS(parser).then((file) => {
      const componentName = componentLine
        /* Matches everything between " */
        .match(/".*"/gm)?.[0]
        /* Replaces every " with nothing */
        .replace(/"/gm, "")
        /* Removes start of import-string */
        .replace("./", "")
        .replace(".darkside.css", ".css");

      if (!componentName) {
        console.error(
          `Could not find component name for line: ${componentLine}`,
        );
        process.exit(1);
      }

      writeFile({
        file,
        filePath: `component/${componentName}`,
      });
    });
  }

  const version = packageJSON.version;

  const files = fastglob.sync("**/*.css", {
    cwd: buildDir,
    ignore: ["**/version/**"],
  });

  for (const file of files) {
    const css = fs.readFileSync(`${buildDir}/${file}`, "utf-8");

    const filename = `${buildDir}/version/${version}/${file}`;
    fs.mkdirSync(path.dirname(filename), { recursive: true });

    fs.writeFileSync(filename, css);
  }
}
