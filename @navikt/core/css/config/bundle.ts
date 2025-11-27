import browserslist from "browserslist";
import esbuild from "esbuild";
import fastglob from "fast-glob";
import { Features, browserslistToTargets, bundleAsync } from "lightningcss";
import fs from "node:fs";
import path from "node:path";
import {
  StyleMappings,
  componentsCss,
  formCss,
  primitivesCss,
} from "../config/_mappings";
import packageJSON from "../package.json";

bundle();

async function bundle() {
  const srcDir = path.join(__dirname, "..", "src");
  const distDir = path.join(__dirname, "..", "dist");

  const indexFileContent = fs.readFileSync(`${srcDir}/index.css`, "utf8");
  const layerDefinition = indexFileContent
    .split("\n")
    .find((line) => line.startsWith("@layer"));

  if (!layerDefinition) {
    throw new Error("No layer definition found in index.css. Stopped bundling");
  }

  /* Make sure every dir is created to make node happy */
  [distDir, `${distDir}/global`, `${distDir}/component`].forEach((dir) => {
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
      filename: `${srcDir}/index.css`,
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
          if (filePath === `${srcDir}/index.css` && rootParser) {
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
    const buildPath = `${distDir}/${filePath}`;
    fs.writeFileSync(buildPath, file);

    /**
     * We use Esbuild package here since we only want it to optimize filesize, not transform any CSS like LightningCSS minifier does.
     * This is because we want to keep the CSS as close to the original as possible.
     */
    const result = esbuild.buildSync({
      entryPoints: [buildPath],
      outfile: buildPath.replace(".css", ".min.css"),
      minify: true, // Enable minification
      bundle: false,
      write: true,
      format: "iife",
      loader: {
        ".css": "css",
      },
    });

    if (result.errors.length > 0) {
      throw new Error(
        `Errors found when minifying for ${filePath} CSS. Stopped bundling\n${result.errors}`,
      );
    }
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
    function parser(input: string) {
      const parsed = input
        .split("\n")
        .filter((line) => line.startsWith("@import"))
        .filter((line) => line.includes(style.main))
        .join("\n");
      return layerDefinition + "\n" + parsed;
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
    const parsed = input
      .split("\n")
      .filter((line) => line.startsWith("@import"))
      .filter((line) => line.includes("form/index.css"))
      .join("\n");
    return layerDefinition + "\n" + parsed;
  }

  await bundleCSS(rootFormParser).then((file) => {
    writeFile({
      file,
      filePath: `component/${formCss}`,
    });
  });

  /* ------------------------------ Primitives build ----------------------------- */
  function rootPrimitivesParser(input: string) {
    const parsed = input
      .split("\n")
      .filter((line) => line.startsWith("@import"))
      .filter((line) => line.includes("primitives/index.css"))
      .join("\n");
    return layerDefinition + "\n" + parsed;
  }

  await bundleCSS(rootPrimitivesParser).then((file) => {
    writeFile({
      file,
      filePath: `component/${primitivesCss}`,
    });
  });

  /* ---------------------------- /component build ---------------------------- */

  function componentFiles(): string[] {
    const indexFile = indexFileContent;

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
    function parser(input: string) {
      const parsed = input
        .split("\n")
        .filter((line) => line === componentLine)
        .join("\n");
      return layerDefinition + "\n" + parsed;
    }

    await bundleCSS(parser).then((file) => {
      const componentName = componentLine
        /* Matches everything between " */
        .match(/".*"/gm)?.[0]
        /* Replaces every " with nothing */
        .replace(/"/gm, "")
        /* Removes start of import-string */
        .replace("./", "");

      if (!componentName) {
        throw new Error(
          `Could not find component name for line: ${componentLine}`,
        );
      }

      const sanitizedName = componentName
        /*
         * https://regex101.com/r/MAj58n/1
         * Removes every - and space
         */
        .replace(/[\s-]/g, "")
        .replace(".css", "")
        .toLowerCase();

      writeFile({
        file,
        filePath: `component/${sanitizedName}.css`,
      });
    });
  }

  const version = packageJSON.version;

  /**
   * We only publish
   * - index.css
   * - index.min.css
   *
   * to CDNs with versioning
   */
  const files = fastglob.sync("**/index*.css", {
    cwd: distDir,
    ignore: ["**/version/**"],
  });

  for (const file of files) {
    const css = fs.readFileSync(`${distDir}/${file}`, "utf-8");

    const filename = `${distDir}/version/${version}/${file}`;
    fs.mkdirSync(path.dirname(filename), { recursive: true });

    fs.writeFileSync(filename, css);
  }
}
