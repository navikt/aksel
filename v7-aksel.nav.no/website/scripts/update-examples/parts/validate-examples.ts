import { execSync } from "child_process";
import fs from "node:fs";

type ExampleDataT = {
  title: string;
  filer: { navn: string; innhold: string }[];
};

export function validateExamples(exampleData: ExampleDataT[]) {
  // Create temp folder
  const tempDir = "___temp";
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  // Write code to temp files
  exampleData.forEach((data) => {
    data.filer.forEach((fil) => {
      const dir = `${tempDir}/${data.title}`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      const content = fil.innhold
        .replace("\nfunction Example()", "\nexport function Example()")
        .replace("\nconst Example = ()", "\nexport const Example = ()");
      fs.writeFileSync(`${dir}/${fil.navn}.tsx`, content);
    });
  });

  // Generate temp tsconfig
  const tempTsConfig = `{ "extends":"./tsconfig.json", "include":["${tempDir}"] }`;
  const tempTsConfigFile = "tsconfig.temp.json";
  fs.writeFileSync(tempTsConfigFile, tempTsConfig);

  // Run tsc on temp files
  let success = true;
  try {
    const cmd = `yarn tsc --noEmit --noUnusedLocals true --incremental false -p ${tempTsConfigFile}`;
    execSync(cmd, { stdio: "inherit" }); // Setting stdio to inherit makes the output visible in the console
  } catch {
    success = false;
  }

  // Clean up
  fs.rmSync(tempTsConfigFile);
  fs.rmSync(tempDir, { recursive: true });

  return success;
}
