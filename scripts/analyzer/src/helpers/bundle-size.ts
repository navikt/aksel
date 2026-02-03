import { randomUUID } from "node:crypto";
import { unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { rolldown } from "rolldown";

async function getBundleSize(
  code: string,
): Promise<{ minified: number; gzip: number }> {
  const inputFile = join(process.cwd(), `.bundle-input-${randomUUID()}.js`);
  writeFileSync(inputFile, code);

  /* Common externals - peer dependencies that shouldn't be bundled */
  const commonExternals: string[] = ["react", "react-dom"];

  try {
    const minBundle = await rolldown({
      input: inputFile,
      external: commonExternals,
      platform: "browser",
      treeshake: true,
      logLevel: "silent",
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
