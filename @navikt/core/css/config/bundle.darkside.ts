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

bundleDarkside();

async function bundleDarkside() {
  const buildDir = path.join(__dirname, "..", "dist/darkside");
  const darksideDir = path.join(__dirname, "..", "darkside");

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
      filename: `${darksideDir}/index.css`,
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
          if (filePath === `${darksideDir}/index.css` && rootParser) {
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
    const buildPath = `${buildDir}/${filePath}`;
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

    /* If one imports this file standalone, we would like to make sure the layering order is included.  */
    const layerDefinition = rootString
      .split("\n")
      .find((line) => line.startsWith("@layer"));

    if (!layerDefinition) {
      throw new Error(
        "No layer definition found in index.css. Stopped bundling",
      );
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
    const indexFile = fs.readFileSync(`${darksideDir}/index.css`, "utf8");

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
