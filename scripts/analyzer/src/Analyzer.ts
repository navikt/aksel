import fastGlob from "fast-glob";
import { rename } from "node:fs";
import { dirname } from "node:path";
import { extract } from "tar";

class Analyzer {
  packageDir: string;

  constructor(tarballPath: string) {
    this.packageDir = this.unpack(tarballPath);
  }

  private unpack(tarballGlob: string): string {
    const tarballPath = fastGlob.sync(tarballGlob)[0];
    if (!tarballPath) {
      throw new Error(`Tarball not found for glob: ${tarballGlob}`);
    }

    extract({
      file: tarballPath,
      cwd: dirname(tarballPath),
      sync: true,
    });

    /**
     * navikt-ds-react-3.5.0.tgz -> ds-react
     */
    const outDir = tarballPath.split("-").slice(1, 3).join("-");

    /**
     * Npm packages are always packed into a folder named "package"
     * temp/local/package -> temp/local/ds-react
     */
    rename(
      `${dirname(tarballPath)}/package`,
      `${dirname(tarballPath)}/${outDir}`,
      (err) => {
        if (err) throw err;
      },
    );

    return `${dirname(tarballPath)}/${outDir}`;
  }
}

class CSSAnalyzer extends Analyzer {
  constructor(tarballPath: string) {
    super(tarballPath);
  }
}

class ReactAnalyzer extends Analyzer {
  constructor(tarballPath: string) {
    super(tarballPath);
  }
}

export { Analyzer, CSSAnalyzer, ReactAnalyzer };
