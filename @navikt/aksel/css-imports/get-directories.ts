import fg from "fast-glob";
import path from "path";

export async function getDirectories() {
  const baseDir = process.cwd();
  const ignoreNodeModules = [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/lib/**",
  ];
  const directories = await fg(`${baseDir}/**`, {
    onlyDirectories: true,
    ignore: ignoreNodeModules,
  });

  directories.sort((a, b) => a.length - b.length);

  return [baseDir, ...directories].map((x) =>
    x.replace(baseDir, path.basename(baseDir))
  );
}
