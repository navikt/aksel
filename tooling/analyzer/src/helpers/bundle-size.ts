import { randomUUID } from "node:crypto";
import { unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { rolldown } from "rolldown";

/**
 * Locale files are imported by Provider/Date.locale and would otherwise be
 * counted in every component bundle. They are measured separately instead.
 */
const LOCALES_EXTERNAL = /[\\/]i18n[\\/]locales[\\/]/;

async function getBundleSize(
  code: string,
  options: { includeLocales?: boolean } = {},
): Promise<{ minified: number; gzip: number }> {
  const inputFile = join(process.cwd(), `.bundle-input-${randomUUID()}.js`);
  writeFileSync(inputFile, code);

  /* Common externals - peer dependencies that shouldn't be bundled */
  const commonExternals: string[] = ["react", "react-dom"];

  try {
    const minBundle = await rolldown({
      input: inputFile,
      external: options.includeLocales
        ? commonExternals
        : [...commonExternals, LOCALES_EXTERNAL],
      platform: "browser",
      treeshake: {
        moduleSideEffects: "no-external",
        propertyReadSideEffects: false,
      },
      logLevel: "silent",
      experimental: {
        lazyBarrel: true,
      },
      resolve: {
        conditionNames: ["import", "module", "browser", "default"],
      },
    });

    const minOutput = await minBundle.generate({
      format: "esm",
      minify: true,
    });

    const minCode = minOutput.output[0].code;
    const minSize = Buffer.byteLength(minCode, "utf8");
    const minGzip = gzipSync(minCode).length;

    await minBundle.close();

    return {
      minified: minSize,
      gzip: minGzip,
    };
  } finally {
    try {
      unlinkSync(inputFile);
    } catch {
      // Ignore cleanup errors
    }
  }
}

export { getBundleSize };
